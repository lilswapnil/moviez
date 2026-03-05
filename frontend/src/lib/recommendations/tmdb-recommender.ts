/**
 * Recommendation types - matches backend /api/v1/recommendations response.
 * Logic now lives in the backend (Python).
 */
export type RecommendationType = 'movie' | 'show';

export interface RecommendationResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  popularity: number;
  score: number;
  kind: RecommendationType;
}
