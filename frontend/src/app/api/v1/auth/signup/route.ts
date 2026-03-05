import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { detail: "Auth not implemented. Add user storage (DB, Supabase, etc.) to enable signup." },
    { status: 501 }
  );
}
