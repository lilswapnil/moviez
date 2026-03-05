import { NextRequest, NextResponse } from "next/server";
import { tmdbSeason } from "@/lib/api/tmdb-server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tvId = parseInt(searchParams.get("tvId") || "0", 10);
  const seasonNumber = parseInt(searchParams.get("seasonNumber") || "0", 10);

  if (!tvId || !seasonNumber) return NextResponse.json({ episodes: [] });

  try {
    const data = await tmdbSeason(tvId, seasonNumber);
    const episodes = ((data.episodes || []) as Record<string, unknown>[]).map((ep) => ({
      id: ep.id,
      episode_number: ep.episode_number,
      name: ep.name,
      still_path: ep.still_path,
      overview: ep.overview,
      air_date: ep.air_date,
      vote_average: ep.vote_average,
    }));
    return NextResponse.json({ episodes });
  } catch (e) {
    console.error("API episodes error:", e);
    return NextResponse.json({ episodes: [] });
  }
}
