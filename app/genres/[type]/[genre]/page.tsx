import { getMoviesByGenre, getTVShowsByGenre, Movie, TVShow } from '@/lib/tmdb';
import { movieGenreIds, tvGenreIds, animeGenreIds, cartoonGenreIds } from '@/lib/category';
import GenreContent from '@/app/components/GenreContent';

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
    <div className="mt-8 px-12 py-16">
      <main className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            {decodedGenre} {type === 'movies' ? 'Movies' : type === 'shows' ? 'Shows' : type === 'animes' ? 'Anime' : 'Cartoons'}
          </h1>
          <p className="text-gray-400">
            Showing {results.length} results
          </p>
        </header>

        {results.length > 0 ? (
          <GenreContent
            initialResults={results}
            type={type}
            genre={decodedGenre}
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
