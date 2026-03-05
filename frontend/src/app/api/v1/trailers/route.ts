import { NextRequest, NextResponse } from "next/server";
import { tmdbMovieVideos, tmdbTvVideos } from "@/lib/api/tmdb-server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) return NextResponse.json({ results: [] });
  const itemId = parseInt(id, 10);
  if (Number.isNaN(itemId)) return NextResponse.json({ results: [] });

  try {
    const results = type === "movie" ? await tmdbMovieVideos(itemId) : await tmdbTvVideos(itemId);
    return NextResponse.json({ results });
  } catch (e) {
    console.error("API trailers error:", e);
    return NextResponse.json({ results: [] });
  }
}
