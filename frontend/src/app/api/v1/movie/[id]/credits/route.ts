import { NextRequest, NextResponse } from "next/server";
import { tmdbMovieCredits } from "@/lib/api/tmdb-server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id, 10);
  if (Number.isNaN(id)) return NextResponse.json({ cast: [] });

  try {
    const cast = await tmdbMovieCredits(id);
    return NextResponse.json({ cast });
  } catch {
    return NextResponse.json({ cast: [] });
  }
}
