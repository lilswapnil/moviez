import { NextRequest, NextResponse } from "next/server";
import { tmdbMovie } from "@/lib/api/tmdb-server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id, 10);
  if (Number.isNaN(id)) return NextResponse.json({ detail: "Not found" }, { status: 404 });

  try {
    const data = await tmdbMovie(id);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ detail: "Not found" }, { status: 404 });
  }
}
