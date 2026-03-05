import { NextRequest, NextResponse } from "next/server";
import { tmdbTvCredits } from "@/lib/api/tmdb-server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id, 10);
  if (Number.isNaN(id)) return NextResponse.json({ cast: [] });

  try {
    const cast = await tmdbTvCredits(id);
    return NextResponse.json({ cast });
  } catch {
    return NextResponse.json({ cast: [] });
  }
}
