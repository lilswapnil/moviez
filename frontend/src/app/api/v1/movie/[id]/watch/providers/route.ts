import { NextRequest, NextResponse } from "next/server";
import { tmdbMovieWatchProviders } from "@/lib/api/tmdb-server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = parseInt((await params).id, 10);
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") || "US";
  if (Number.isNaN(id)) return NextResponse.json({ results: {} });

  try {
    const data = await tmdbMovieWatchProviders(id, country);
    return NextResponse.json({ results: data ? { [country]: data } : {} });
  } catch {
    return NextResponse.json({ results: {} });
  }
}
