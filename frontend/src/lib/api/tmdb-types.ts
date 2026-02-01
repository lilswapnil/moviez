// API types extracted from tmdb.ts
export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
  original_language?: string;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
  original_language?: string;
  origin_country?: string[];
}

export type Anime = TVShow;
export type Cartoon = TVShow;

export interface Trailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface GenreTag {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime?: number;
  status?: string;
  tagline?: string;
  genres?: GenreTag[];
  homepage?: string;
}

export interface TVDetails extends TVShow {
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
  tagline?: string;
  genres?: GenreTag[];
  homepage?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
  order?: number;
}
