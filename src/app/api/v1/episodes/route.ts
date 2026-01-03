import { getSeasonDetails } from '@/lib/api/tmdb-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tvId = searchParams.get('tvId');
  const seasonNumber = searchParams.get('seasonNumber');

  if (!tvId || !seasonNumber) {
    return Response.json(
      { error: 'Missing required parameters: tvId and seasonNumber' },
      { status: 400 }
    );
  }

  try {
    const data = await getSeasonDetails(Number(tvId), Number(seasonNumber));
    
    if (!data) {
      return Response.json(
        { episodes: [] },
        { status: 200 }
      );
    }

    const episodes = (data.episodes || []).map((ep: any) => ({
      id: ep.id,
      episode_number: ep.episode_number,
      name: ep.name,
      still_path: ep.still_path,
      overview: ep.overview,
      air_date: ep.air_date,
      vote_average: ep.vote_average,
    }));

    return Response.json({ episodes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return Response.json(
      { error: 'Failed to fetch episodes' },
      { status: 500 }
    );
  }
}
