import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
    // Optionally fetch user info from DB here
    return NextResponse.json({ user: decoded });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // 'error' is defined but never used
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
