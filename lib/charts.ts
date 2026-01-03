import { movieCharts, tvCharts, animeCharts, cartoonCharts } from './category';
import {
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNewReleases,
  getPopularMovies,
  getTrendingTVShows,
  getTopRatedShows,
  getAiringTodayShows,
  getUpcomingShows,
  getPopularTVShows,
  getPopularAnimeShows,
  getTopRatedAnimeShows,
  getAiringNowAnimeShows,
  getUpcomingAnimeShows,
  getClassicAnimeShows,
  getPopularCartoonShows,
  getTopRatedCartoonShows,
  getKidsFavoriteCartoons,
  getTrendingCartoons,
  getFamilyCartoonShows,
  Movie,
  TVShow,
} from './tmdb';

export type ChartFetcher = (page?: number) => Promise<Movie[] | TVShow[]>;

export const chartSectionsConfig = [
  { title: 'Movie Charts', charts: movieCharts },
  { title: 'TV Charts', charts: tvCharts },
  { title: 'Anime Charts', charts: animeCharts },
  { title: 'Cartoon Charts', charts: cartoonCharts },
];

export const chartFetchers: Record<string, ChartFetcher> = {
  'Trending Movies': (page) => getTrendingMovies(page),
  'Top Rated Movies': (page) => getTopRatedMovies(page),
  'Upcoming Movies': (page) => getUpcomingMovies(page),
  'Now Playing Movies': (page) => getNewReleases(page),
  'Popular Movies': (page) => getPopularMovies(page),
  'Trending TV Shows': (page) => getTrendingTVShows(page),
  'Top Rated TV Shows': (page) => getTopRatedShows(page),
  'Airing Today': (page) => getAiringTodayShows(page),
  'On The Air': (page) => getUpcomingShows(page),
  'Popular TV Shows': (page) => getPopularTVShows(page),
  'Popular Anime': (page) => getPopularAnimeShows(page),
  'Top Rated Anime': (page) => getTopRatedAnimeShows(page),
  'Airing Now': (page) => getAiringNowAnimeShows(page),
  'Upcoming Anime': (page) => getUpcomingAnimeShows(page),
  'All Time Classics': (page) => getClassicAnimeShows(page),
  'Popular Cartoons': (page) => getPopularCartoonShows(page),
  'Top Rated Cartoons': (page) => getTopRatedCartoonShows(page),
  'Kids Favorites': (page) => getKidsFavoriteCartoons(page),
  'Trending Cartoons': (page) => getTrendingCartoons(page),
  'Family Friendly': (page) => getFamilyCartoonShows(page),
};

export { chartNameToSlug, getChartNameFromSlug, chartSlugs, chartNames } from './chartSlugs';

export interface ChartResultItem {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  year?: number;
  voteAverage: number;
}

export function normalizeChartItems(results: (Movie | TVShow)[]): ChartResultItem[] {
  return results.map((item) => {
    const title = 'title' in item && item.title ? item.title : 'name' in item ? item.name : undefined;
    const dateValue = 'release_date' in item ? item.release_date : 'first_air_date' in item ? item.first_air_date : undefined;
    const year = dateValue ? new Date(dateValue).getFullYear() : undefined;
    const voteAverage = Number.isFinite(item.vote_average) ? item.vote_average : 0;

    return {
      id: item.id,
      title: title ?? 'Untitled',
      overview: item.overview ?? '',
      posterPath: item.poster_path ?? null,
      year,
      voteAverage,
    };
  });
}
