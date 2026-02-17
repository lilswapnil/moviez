import { notFound } from 'next/navigation';
import TitleHero from '@/components/sections/TitleHero';
import TitleCastSection from '@/components/sections/TitleCastSection';
import SimilarTitles from '@/components/sections/SimilarTitles';
import MerchandiseSection from '@/components/sections/MerchandiseSection';
import EpisodesSection from '@/components/sections/EpisodesSection';
import Button from '@/components/common/Button';
import { getMovieCredits, getMovieDetails, getTVCredits, getTVShowDetails, getSimilarMovies, getSimilarTVShows, getCollectionDetails, getMovieWatchProviders, getTVWatchProviders } from '@/lib/api/tmdb-client';
import Image from 'next/image';

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
    const [details, credits, similar, watchProviders] = await Promise.all([
      getMovieDetails(numericId),
      getMovieCredits(numericId),
      getSimilarMovies(numericId),
      getMovieWatchProviders(numericId, 'US'),
    ]);
    if (!details) {
      notFound();
    }
  // Extract streaming platforms (flatrate, buy, rent, free, ads)
  const streamingPlatforms = watchProviders?.flatrate || [];
  const providerLink = watchProviders?.link || null;

    let merchandiseItems: Array<{ id: number; title: string; posterPath: string | null; releaseDate: string | null; voteAverage?: number }> = [];
    if (details.belongs_to_collection?.id) {
      const collection = await getCollectionDetails(details.belongs_to_collection.id);
      if (collection?.parts) {
        merchandiseItems = collection.parts
          .filter((part: { id: number }) => part.id !== numericId)
          .map((part: { id: number; title: string; poster_path: string | null; release_date: string | null; vote_average?: number }) => ({
            id: part.id,
            title: part.title,
            posterPath: part.poster_path,
            releaseDate: part.release_date,
            voteAverage: part.vote_average,
          }));
      }
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
          {/* Streaming Platform Buttons */}
          {streamingPlatforms.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-3 items-center">
              <span className="text-white/80 font-semibold mr-2">Available on:</span>
              {streamingPlatforms.map((provider) => (
                <a
                  key={provider.provider_id}
                  href={providerLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-colors"
                >
                  {provider.logo_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                      alt={provider.provider_name}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                  )}
                  {provider.provider_name}
                </a>
              ))}
            </div>
          )}
          <TitleCastSection cast={credits} />
        </TitleHero>
        <div className="bg-gradient-to-b from-transparent via-black/50 to-black px-6 md:px-12 lg:px-11 py-6">
          {merchandiseItems.length > 0 && <MerchandiseSection items={merchandiseItems} title={`More from ${details.belongs_to_collection?.name || 'this Franchise'}`} />}
          <SimilarTitles items={similar} titleType="movies" />
        </div>
      </main>
    );
  }

  const [details, credits, similar, watchProviders] = await Promise.all([
    getTVShowDetails(numericId),
    getTVCredits(numericId),
    getSimilarTVShows(numericId),
    getTVWatchProviders(numericId, 'US'),
  ]);
  if (!details) {
    notFound();
  }
  // Extract streaming platforms (flatrate, buy, rent, free, ads)
  const streamingPlatforms = watchProviders?.flatrate || [];
  const providerLink = watchProviders?.link || null;

  const seasonsData: Array<{ season_number: number; name: string }> = (details.seasons || [])
    .filter((season: { season_number: number }) => season.season_number !== 0)
    .map((season: { season_number: number; name: string }) => ({
      season_number: season.season_number,
      name: season.name,
    }));

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
        {/* Streaming Platform Buttons */}
        {streamingPlatforms.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-3 items-center">
            <span className="text-white/80 font-semibold mr-2">Available on:</span>
            {streamingPlatforms.map((provider) => (
              <Button
                key={provider.provider_id}
                href={providerLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                shape="pill"
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-colors"
              >
                {provider.logo_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                    width={24}
                    height={24}
                    className="rounded"
                  />
                )}
                {provider.provider_name}
              </Button>
            ))}
          </div>
        )}
        <TitleCastSection cast={credits} />
      </TitleHero>
      <div className="bg-gradient-to-b from-transparent via-black/50 to-black px-6 md:px-12 lg:px-16 py-2">
        {seasonsData.length > 0 && <EpisodesSection seasons={seasonsData} tvId={numericId} />}
        <SimilarTitles items={similar} titleType={routeType === 'shows' ? 'shows' : routeType === 'animes' ? 'animes' : 'cartoons'} />
      </div>
    </main>
  );
}
