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

type ChartFetcher = () => Promise<Movie[] | TVShow[]>;

export const chartSectionsConfig = [
  { title: 'Movie Charts', charts: movieCharts },
  { title: 'TV Charts', charts: tvCharts },
  { title: 'Anime Charts', charts: animeCharts },
  { title: 'Cartoon Charts', charts: cartoonCharts },
];

export const chartFetchers: Record<string, ChartFetcher> = {
  'Trending Movies': () => getTrendingMovies(),
  'Top Rated Movies': () => getTopRatedMovies(),
  'Upcoming Movies': () => getUpcomingMovies(),
  'Now Playing Movies': () => getNewReleases(),
  'Popular Movies': () => getPopularMovies(),
  'Trending TV Shows': () => getTrendingTVShows(),
  'Top Rated TV Shows': () => getTopRatedShows(),
  'Airing Today': () => getAiringTodayShows(),
  'On The Air': () => getUpcomingShows(),
  'Popular TV Shows': () => getPopularTVShows(),
  'Popular Anime': () => getPopularAnimeShows(),
  'Top Rated Anime': () => getTopRatedAnimeShows(),
  'Airing Now': () => getAiringNowAnimeShows(),
  'Upcoming Anime': () => getUpcomingAnimeShows(),
  'All Time Classics': () => getClassicAnimeShows(),
  'Popular Cartoons': () => getPopularCartoonShows(),
  'Top Rated Cartoons': () => getTopRatedCartoonShows(),
  'Kids Favorites': () => getKidsFavoriteCartoons(),
  'Trending Cartoons': () => getTrendingCartoons(),
  'Family Friendly': () => getFamilyCartoonShows(),
};

export type { ChartFetcher };

export { chartNameToSlug, getChartNameFromSlug, chartSlugs, chartNames } from './chartSlugs';
