import { notFound } from 'next/navigation';
import TitleHero from '@/components/sections/TitleHero';
import TitleCastSection from '@/components/sections/TitleCastSection';
import SimilarTitles from '@/components/sections/SimilarTitles';
import { getMovieCredits, getMovieDetails, getTVCredits, getTVShowDetails, getSimilarMovies, getSimilarTVShows } from '@/lib/api/tmdb-client';

export const dynamic = 'force-dynamic';

interface TitlePageProps {
  params: Promise<{ type: string; id: string }>;
}

export const revalidate = 3600;

const ALLOWED_TYPES = ['movies', 'shows', 'animes', 'cartoons'] as const;
type RouteType = (typeof ALLOWED_TYPES)[number];

export default async function TitlePage({ params }: TitlePageProps) {
  const { type, id } = await params;
  const numericId = Number(id);

  if (!ALLOWED_TYPES.includes(type as RouteType)) {
    notFound();
  }

  const routeType = type as RouteType;

  if (!Number.isFinite(numericId) || numericId <= 0) {
    notFound();
  }

  if (routeType === 'movies') {
    const [details, credits, similar] = await Promise.all([
      getMovieDetails(numericId),
      getMovieCredits(numericId),
      getSimilarMovies(numericId),
    ]);
    if (!details) {
      notFound();
    }

    const releaseYear = details.release_date ? new Date(details.release_date).getFullYear() : undefined;
    const runtimeMinutes = details.runtime ?? null;
    const genres = details.genres?.map((genre) => genre.name) ?? [];

    return (
      <main className="bg-black text-white min-h-screen">
        <TitleHero
          item={{
            id: details.id,
            title: details.title ?? 'Untitled',
            overview: details.overview ?? '',
            voteAverage: details.vote_average ?? 0,
            releaseYear,
            runtimeMinutes,
            genres,
            backdropPath: details.backdrop_path,
            posterPath: details.poster_path,
            tagline: details.tagline,
            originalLanguage: details.original_language,
          }}
          displayType="Movie"
          trailerType="movie"
        >
          <TitleCastSection cast={credits} />
        </TitleHero>
        <div className="bg-gradient-to-b from-transparent via-black/50 to-black px-6 md:px-12 lg:px-16 py-6">
          <SimilarTitles items={similar} titleType="movies" />
        </div>
      </main>
    );
  }

  const [details, credits, similar] = await Promise.all([
    getTVShowDetails(numericId),
    getTVCredits(numericId),
    getSimilarTVShows(numericId),
  ]);
  if (!details) {
    notFound();
  }

  const releaseYear = details.first_air_date ? new Date(details.first_air_date).getFullYear() : undefined;
  const runtimeMinutes = Array.isArray(details.episode_run_time) && details.episode_run_time.length > 0
    ? details.episode_run_time[0]
    : null;
  const genres = details.genres?.map((genre) => genre.name) ?? [];

  const displayType =
    routeType === 'shows' ? 'TV Series' : routeType === 'animes' ? 'Anime Series' : 'Cartoon Series';

  return (
    <main className="bg-black text-white min-h-screen">
      <TitleHero
        item={{
          id: details.id,
          title: details.name ?? 'Untitled',
          overview: details.overview ?? '',
          voteAverage: details.vote_average ?? 0,
          releaseYear,
          runtimeMinutes,
          genres,
          backdropPath: details.backdrop_path,
          posterPath: details.poster_path,
          tagline: details.tagline,
          originalLanguage: details.original_language,
        }}
        displayType={displayType}
        trailerType="tv"
      >
        <TitleCastSection cast={credits} />
      </TitleHero>
      <div className="bg-gradient-to-b from-transparent via-black/50 to-black px-6 md:px-12 lg:px-16 py-2">
        <SimilarTitles items={similar} titleType={routeType === 'shows' ? 'shows' : routeType === 'animes' ? 'animes' : 'cartoons'} />
      </div>
    </main>
  );
}
