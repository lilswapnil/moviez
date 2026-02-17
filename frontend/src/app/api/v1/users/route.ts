import "dotenv/config";
import { NextResponse } from 'next/server';
import { Prisma } from "@prisma/client";
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!name || !normalizedEmail || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
      },
    });
    // Do not return password in response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    let errorMessage = 'Unknown error';
    if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = String((error as { message?: unknown }).message);
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}