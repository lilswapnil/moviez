import { NextRequest, NextResponse } from 'next/server';

import { recommendFromTmdb } from '@/lib/recommendations/tmdb-recommender';

type RecommendationRequest = {
  prompt?: string;
  type?: 'movie' | 'show';
  limit?: number;
};

export async function POST(req: NextRequest) {
  const { prompt, type = 'movie', limit = 15 } = (await req.json()) as RecommendationRequest;

  if (!prompt || prompt.trim().length === 0) {
    return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
  }

  if (!process.env.TMDB_API_KEY) {
    return NextResponse.json({ error: 'TMDB_API_KEY is not configured' }, { status: 500 });
  }

  const recommendations = await recommendFromTmdb(prompt, type, limit);

  return NextResponse.json({
    recommendations,
    meta: {
      prompt,
      type,
      limit,
    },
  });
}
