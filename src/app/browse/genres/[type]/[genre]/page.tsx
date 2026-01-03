import { getMoviesByGenre, getTVShowsByGenre } from '@/lib/api/tmdb-client';
import type { Movie, TVShow } from '@/lib/api/tmdb-types';
import { movieGenreIds, tvGenreIds, animeGenreIds, cartoonGenreIds } from '@/lib/constants/genres.const';
import GenreContent from '@/components/sections/GenreContent';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface GenrePageProps {
  params: Promise<{
    type: 'movies' | 'shows' | 'animes' | 'cartoons';
    genre: string;
  }>;
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { type, genre } = await params;
  const decodedGenre = decodeURIComponent(genre);
  let results: (Movie | TVShow)[] = [];
  let genreId = 0;

  if (type === 'movies') {
    genreId = movieGenreIds[decodedGenre] || 0;
    if (genreId) {
      results = await getMoviesByGenre(genreId);
    }
  } else if (type === 'shows') {
    genreId = tvGenreIds[decodedGenre] || 0;
    if (genreId) {
      results = await getTVShowsByGenre(genreId);
    }
  } else if (type === 'animes') {
    genreId = animeGenreIds[decodedGenre] || 0;
    if (genreId) {
      results = await getTVShowsByGenre(genreId);
    }
  } else if (type === 'cartoons') {
    genreId = cartoonGenreIds[decodedGenre] || 0;
    if (genreId) {
      results = await getTVShowsByGenre(genreId);
    }
  }

  return (
    <div className="mt-20 px-6 py-16">
      <main className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link
            href="/browse/library"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            &larr; Back to Library
          </Link>
        </div>
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-white">
            {decodedGenre} {type === 'movies' ? 'Movies' : type === 'shows' ? 'Shows' : type === 'animes' ? 'Anime' : 'Cartoons'}
          </h1>
          <p className="text-gray-300">
            Showing {results.length} results
          </p>
        </header>

        {results.length > 0 ? (
          <GenreContent
            initialResults={results}
            type={type}
            genreId={genreId}
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No {type} found in the {decodedGenre} genre.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
