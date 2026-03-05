import { NextRequest, NextResponse } from "next/server";
import { tmdbSeason } from "@/lib/api/tmdb-server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; seasonNumber: string }> }
) {
  const { id, seasonNumber } = await params;
  const tvId = parseInt(id, 10);
  const sn = parseInt(seasonNumber, 10);
  if (Number.isNaN(tvId) || Number.isNaN(sn)) {
    return NextResponse.json({ detail: "Not found" }, { status: 404 });
  }

  try {
    const data = await tmdbSeason(tvId, sn);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ detail: "Not found" }, { status: 404 });
  }
}
