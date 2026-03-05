import { NextRequest, NextResponse } from "next/server";
import { tmdbMovieImages, tmdbTvImages } from "@/lib/api/tmdb-server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) return NextResponse.json({ logos: [] });
  const itemId = parseInt(id, 10);
  if (Number.isNaN(itemId)) return NextResponse.json({ logos: [] });

  try {
    const data =
      type === "movie" || type === "international"
        ? await tmdbMovieImages(itemId)
        : await tmdbTvImages(itemId);
    return NextResponse.json(data);
  } catch (e) {
    console.error("API images error:", e);
    return NextResponse.json({ logos: [] });
  }
}
