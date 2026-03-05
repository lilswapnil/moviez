import { NextRequest, NextResponse } from "next/server";
import { tmdbMoviesByGenre, tmdbTvByGenre } from "@/lib/api/tmdb-server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const genreId = parseInt(searchParams.get("genreId") || "0", 10);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  if (!type || !genreId) return NextResponse.json([]);

  try {
    const results =
      type === "movies" ? await tmdbMoviesByGenre(genreId, page) : await tmdbTvByGenre(genreId, page);
    return NextResponse.json(Array.isArray(results) ? results : []);
  } catch (e) {
    console.error("API genres error:", e);
    return NextResponse.json([]);
  }
}
