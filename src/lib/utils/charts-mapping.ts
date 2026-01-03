import { movieCharts, tvCharts, animeCharts, cartoonCharts } from '../constants/genres.const';
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
  getUpcomingCartoons,
  getFamilyCartoonShows,
} from '../api/tmdb-client';
import type { Movie, TVShow } from '../api/tmdb-types';

export type ChartFetcher = (page?: number) => Promise<Movie[] | TVShow[]>;

export const chartSectionsConfig = [
  { title: 'Movie Charts', charts: movieCharts },
  { title: 'TV Charts', charts: tvCharts },
  { title: 'Anime Charts', charts: animeCharts },
  { title: 'Cartoon Charts', charts: cartoonCharts },
];

type ChartCategory = 'movie' | 'tv' | 'anime' | 'cartoon';

const chartCategoryMap = new Map<string, ChartCategory>();
movieCharts.forEach((name) => chartCategoryMap.set(name, 'movie'));
tvCharts.forEach((name) => chartCategoryMap.set(name, 'tv'));
animeCharts.forEach((name) => chartCategoryMap.set(name, 'anime'));
cartoonCharts.forEach((name) => chartCategoryMap.set(name, 'cartoon'));

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
  'Popular International TV Shows': (page) => getPopularTVShows(page),
  'Top Rated International TV Shows': (page) => getTopRatedShows(page),
  'Upcoming International TV Shows': (page) => getUpcomingShows(page),
  'Popular Anime': (page) => getPopularAnimeShows(page),
  'Top Rated Anime': (page) => getTopRatedAnimeShows(page),
  'Airing Now': (page) => getAiringNowAnimeShows(page),
  'Upcoming Anime': (page) => getUpcomingAnimeShows(page),
  'All Time Classics': (page) => getClassicAnimeShows(page),
  'Popular International Anime': (page) => getPopularAnimeShows(page),
  'Top Rated International Anime': (page) => getTopRatedAnimeShows(page),
  'Upcoming International Anime': (page) => getUpcomingAnimeShows(page),
  'Popular Cartoons': (page) => getPopularCartoonShows(page),
  'Top Rated Cartoons': (page) => getTopRatedCartoonShows(page),
  'Kids Favorites': (page) => getKidsFavoriteCartoons(page),
  'Family Friendly': (page) => getFamilyCartoonShows(page),
  'Popular International Cartoons': (page) => getPopularCartoonShows(page),
  'Top International Cartoons': (page) => getTopRatedCartoonShows(page),
  'Upcoming International': (page) => getUpcomingCartoons(page),
  'Popular International Movies': (page) => getPopularMovies(page),
  'Top Rated International Movies': (page) => getTopRatedMovies(page),
  'Upcoming International Movies': (page) => getUpcomingMovies(page),
};

export { chartNameToSlug, getChartNameFromSlug, chartSlugs, chartNames } from './chart-slugs';

export interface ChartResultItem {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  year?: number;
  voteAverage: number;
  mediaType: ChartCategory;
}

export function getChartCategory(chartName: string): ChartCategory {
  return chartCategoryMap.get(chartName) ?? 'movie';
}

function resolveMediaType(
  item: Movie | TVShow,
  fallback: ChartCategory
): ChartCategory {
  const isMovie = 'title' in item && typeof item.title === 'string';
  if (isMovie) {
    return 'movie';
  }
  if (fallback === 'anime' || fallback === 'cartoon') {
    return fallback;
  }
  return 'tv';
}

export function normalizeChartItems(
  results: (Movie | TVShow)[],
  fallback: ChartCategory = 'movie'
): ChartResultItem[] {
  return results.map((item) => {
    const title = 'title' in item && item.title ? item.title : 'name' in item ? item.name : undefined;
    const dateValue = 'release_date' in item ? item.release_date : 'first_air_date' in item ? item.first_air_date : undefined;
    const year = dateValue ? new Date(dateValue).getFullYear() : undefined;
    const voteAverage = Number.isFinite(item.vote_average) ? item.vote_average : 0;
    const mediaType = resolveMediaType(item, fallback);

    return {
      id: item.id,
      title: title ?? 'Untitled',
      overview: item.overview ?? '',
      posterPath: item.poster_path ?? null,
      year,
      voteAverage,
      mediaType,
    };
  });
}
