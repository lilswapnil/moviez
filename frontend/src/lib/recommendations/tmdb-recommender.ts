import {
  type Movie,
  type TVShow,
  getAiringNowShows,
  getNewReleases,
  getPopularMovies,
  getTopRatedMovies,
  getTopRatedShows,
  getTrendingMovies,
  getUpcomingShows,
} from '@/lib/api/tmdb-client';

type RecommendationType = 'movie' | 'show';

export interface RecommendationResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  popularity: number;
  score: number;
  kind: RecommendationType;
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'so', 'because', 'as',
  'of', 'to', 'for', 'from', 'in', 'on', 'at', 'by', 'with', 'without',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'it', 'this', 'that',
  'these', 'those', 'he', 'she', 'they', 'we', 'you', 'i', 'me', 'my',
  'our', 'your', 'their', 'his', 'her', 'its',
]);

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function tokenize(text: string): string[] {
  if (!text) return [];
  return normalizeText(text)
    .split(' ')
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function extractQuotedTitles(prompt: string): string[] {
  const matches = prompt.match(/"([^"]+)"/g) ?? [];
  return matches.map((match) => match.replace(/"/g, '').trim()).filter(Boolean);
}

function extractMinVote(prompt: string): number | null {
  const match = prompt.match(/imdb:\s*(\d+(\.\d+)?)/i);
  if (!match) return null;
  const value = Number.parseFloat(match[1]);
  return Number.isNaN(value) ? null : value;
}

function buildTermFrequency(tokens: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  tokens.forEach((token) => counts.set(token, (counts.get(token) ?? 0) + 1));
  return counts;
}

function buildInverseDocumentFrequency(docs: string[][]): Map<string, number> {
  const docCount = docs.length;
  const df = new Map<string, number>();

  docs.forEach((tokens) => {
    const uniqueTokens = new Set(tokens);
    uniqueTokens.forEach((token) => df.set(token, (df.get(token) ?? 0) + 1));
  });

  const idf = new Map<string, number>();
  df.forEach((count, token) => {
    idf.set(token, Math.log((docCount + 1) / (count + 1)) + 1);
  });

  return idf;
}

function toTfIdfVector(tf: Map<string, number>, idf: Map<string, number>): Map<string, number> {
  const vector = new Map<string, number>();
  tf.forEach((count, token) => {
    const weight = (idf.get(token) ?? 0) * count;
    if (weight > 0) {
      vector.set(token, weight);
    }
  });
  return vector;
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;

  a.forEach((value, token) => {
    dot += value * (b.get(token) ?? 0);
    normA += value * value;
  });

  b.forEach((value) => {
    normB += value * value;
  });

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function buildQueryText(prompt: string): string {
  const stripped = prompt.replace(/imdb:\s*\d+(\.\d+)?/gi, '').trim();
  const quoted = extractQuotedTitles(prompt).join(' ');
  return `${stripped} ${quoted}`.trim();
}

function normalizeMovie(item: Movie): RecommendationResult {
  return {
    id: item.id,
    title: item.title,
    overview: item.overview ?? '',
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    vote_average: item.vote_average ?? 0,
    popularity: item.popularity ?? 0,
    score: 0,
    kind: 'movie',
  };
}

function normalizeShow(item: TVShow): RecommendationResult {
  return {
    id: item.id,
    title: item.name,
    overview: item.overview ?? '',
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    vote_average: item.vote_average ?? 0,
    popularity: item.popularity ?? 0,
    score: 0,
    kind: 'show',
  };
}

async function fetchCandidates(type: RecommendationType): Promise<RecommendationResult[]> {
  if (type === 'show') {
    const [topRated, airingNow, upcoming] = await Promise.all([
      getTopRatedShows(1),
      getAiringNowShows(1),
      getUpcomingShows(1),
    ]);
    return [...topRated, ...airingNow, ...upcoming].map(normalizeShow);
  }

  const [trending, topRated, popular, newReleases] = await Promise.all([
    getTrendingMovies(1),
    getTopRatedMovies(1),
    getPopularMovies(1),
    getNewReleases(1),
  ]);
  return [...trending, ...topRated, ...popular, ...newReleases].map(normalizeMovie);
}

function uniqueById(items: RecommendationResult[]): RecommendationResult[] {
  const seen = new Set<number>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export async function recommendFromTmdb(prompt: string, type: RecommendationType, limit = 15) {
  const candidates = uniqueById(await fetchCandidates(type));
  const minVote = extractMinVote(prompt);
  const filtered = minVote ? candidates.filter((item) => item.vote_average >= minVote) : candidates;

  const queryText = buildQueryText(prompt);
  const queryTokens = tokenize(queryText);

  if (queryTokens.length === 0) {
    return filtered
      .sort((a, b) => b.vote_average - a.vote_average || b.popularity - a.popularity)
      .slice(0, limit)
      .map((item) => ({ ...item, score: item.vote_average }));
  }

  const docs = filtered.map((item) => tokenize(`${item.title} ${item.overview}`));
  const idf = buildInverseDocumentFrequency(docs);
  const queryVector = toTfIdfVector(buildTermFrequency(queryTokens), idf);

  const scored = filtered.map((item, index) => {
    const docVector = toTfIdfVector(buildTermFrequency(docs[index]), idf);
    const score = cosineSimilarity(queryVector, docVector);
    return { ...item, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.vote_average - a.vote_average)
    .slice(0, limit);
}
