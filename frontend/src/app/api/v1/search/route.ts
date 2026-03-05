import { NextRequest, NextResponse } from "next/server";
import { tmdbSearchMulti } from "@/lib/api/tmdb-server";

function normalizeItem(r: Record<string, unknown>) {
  const title = (r.title as string) || (r.name as string) || "Untitled";
  const dateVal = (r.release_date as string) || (r.first_air_date as string);
  const year = dateVal && dateVal.length >= 4 ? parseInt(dateVal.slice(0, 4), 10) : undefined;
  const media = r.media_type === "movie" ? "movie" : "tv";
  return {
    id: r.id,
    title,
    overview: (r.overview as string) || "",
    posterPath: r.poster_path,
    year,
    voteAverage: (r.vote_average as number) ?? 0,
    mediaType: media,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  if (!q) return NextResponse.json({ items: [] });

  try {
    const results = await tmdbSearchMulti(q, page);
    const items = results.map((r) => normalizeItem(r as Record<string, unknown>));
    return NextResponse.json({ items });
  } catch (e) {
    console.error("API search error:", e);
    return NextResponse.json({ error: "TMDB_API_KEY required" }, { status: 503 });
  }
}
