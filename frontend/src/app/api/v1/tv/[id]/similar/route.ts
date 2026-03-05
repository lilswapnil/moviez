import { NextRequest, NextResponse } from "next/server";
import { tmdbTvSimilar } from "@/lib/api/tmdb-server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = parseInt((await params).id, 10);
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  if (Number.isNaN(id)) return NextResponse.json({ results: [] });

  try {
    const results = await tmdbTvSimilar(id, page);
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
