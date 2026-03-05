import { NextRequest, NextResponse } from "next/server";
import {
  tmdbTrendingMovies,
  tmdbTopRatedMovies,
  tmdbPopularMovies,
  tmdbNowPlaying,
  tmdbTopRatedTv,
  tmdbTvAiringToday,
  tmdbUpcomingTv,
} from "@/lib/api/tmdb-server";

const STOP_WORDS = new Set(
  "a an the and or but if then so because as of to for from in on at by with without is are was were be been being it this that these those he she they we you i me my our your their his her its".split(
    " "
  )
);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
}

function buildQueryText(prompt: string): string {
  return prompt.replace(/imdb:\s*\d+(\.\d+)?/gi, "").replace(/"/g, " ").trim();
}

function cosineSim(
  a: Map<string, number>,
  b: Map<string, number>
): number {
  if (a.size === 0 || b.size === 0) return 0;
  let dot = 0,
    na = 0,
    nb = 0;
  a.forEach((v, t) => {
    dot += v * (b.get(t) ?? 0);
    na += v * v;
  });
  b.forEach((v) => {
    nb += v * v;
  });
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}

export async function POST(request: NextRequest) {
  let body: { prompt?: string; type?: string; limit?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const prompt = (body.prompt || "").trim();
  if (!prompt) return NextResponse.json({ error: "prompt is required" }, { status: 400 });

  const limit = Math.min(50, Math.max(1, body.limit ?? 15));
  const mediaType = body.type === "show" ? "show" : "movie";

  try {
    let raw: Record<string, unknown>[];
    if (mediaType === "show") {
      const [top, airing, upcoming] = await Promise.all([
        tmdbTopRatedTv(1),
        tmdbTvAiringToday(1),
        tmdbUpcomingTv(1),
      ]);
      raw = [...top, ...airing, ...upcoming] as Record<string, unknown>[];
    } else {
      const [trend, top, pop, now] = await Promise.all([
        tmdbTrendingMovies(1),
        tmdbTopRatedMovies(1),
        tmdbPopularMovies(1),
        tmdbNowPlaying(1),
      ]);
      raw = [...trend, ...top, ...pop, ...now] as Record<string, unknown>[];
    }

    const seen = new Set<number>();
    const unique = raw.filter((r) => {
      const id = r.id as number;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    const queryTokens = tokenize(buildQueryText(prompt));
    if (queryTokens.length === 0) {
      unique.sort(
        (a, b) =>
          ((b.vote_average as number) ?? 0) - ((a.vote_average as number) ?? 0) ||
          ((b.popularity as number) ?? 0) - ((a.popularity as number) ?? 0)
      );
      const items = unique.slice(0, limit).map((r) => ({
        id: r.id,
        title: (r.title as string) || (r.name as string) || "Untitled",
        overview: (r.overview as string) || "",
        poster_path: r.poster_path,
        backdrop_path: r.backdrop_path,
        vote_average: (r.vote_average as number) ?? 0,
        popularity: (r.popularity as number) ?? 0,
        score: (r.vote_average as number) ?? 0,
        kind: mediaType,
      }));
      return NextResponse.json({ recommendations: items, meta: { prompt, type: mediaType, limit } });
    }

    const docs = unique.map((r) =>
      tokenize(`${(r.title as string) || (r.name as string) || ""} ${(r.overview as string) || ""}`)
    );
    const n = docs.length;
    const df = new Map<string, number>();
    docs.forEach((tokens) => {
      new Set(tokens).forEach((t) => df.set(t, (df.get(t) ?? 0) + 1));
    });
    const idf = new Map<string, number>();
    df.forEach((c, t) => idf.set(t, Math.log((n + 1) / (c + 1)) + 1));

    const tf = new Map<string, number>();
    queryTokens.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
    const qvec = new Map<string, number>();
    tf.forEach((c, t) => {
      const w = (idf.get(t) ?? 0) * c;
      if (w > 0) qvec.set(t, w);
    });

    const scored = unique.map((item, i) => {
      const dtf = new Map<string, number>();
      docs[i].forEach((t) => dtf.set(t, (dtf.get(t) ?? 0) + 1));
      const dvec = new Map<string, number>();
      dtf.forEach((c, t) => {
        const w = (idf.get(t) ?? 0) * c;
        if (w > 0) dvec.set(t, w);
      });
      const score = cosineSim(qvec, dvec);
      return {
        id: item.id,
        title: (item.title as string) || (item.name as string) || "Untitled",
        overview: (item.overview as string) || "",
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        vote_average: (item.vote_average as number) ?? 0,
        popularity: (item.popularity as number) ?? 0,
        score,
        kind: mediaType,
      };
    });

    const filtered = scored.filter((s) => s.score > 0);
    filtered.sort((a, b) => b.score - a.score || b.vote_average - a.vote_average);
    const items = filtered.slice(0, limit);

    return NextResponse.json({
      recommendations: items,
      meta: { prompt, type: mediaType, limit },
    });
  } catch (e) {
    console.error("API recommendations error:", e);
    return NextResponse.json({ error: "TMDB_API_KEY required" }, { status: 503 });
  }
}
