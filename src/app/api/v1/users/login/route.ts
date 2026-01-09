
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '7d' }
    );
    return NextResponse.json({ user: userWithoutPassword, token });
  } catch (error: unknown) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
