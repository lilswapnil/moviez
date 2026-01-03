// Shared type definitions
export type MediaType = 'movie' | 'tv' | 'anime' | 'cartoon';

export interface BaseMedia {
  id: number;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
}

export interface ApiResponse<T> {
  data: T;
  total_pages?: number;
  total_results?: number;
}

export interface ApiErrorResponse {
  status_code: number;
  status_message: string;
}
