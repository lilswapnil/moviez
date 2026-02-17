module.exports = [
"[project]/src/lib/api/tmdb-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// --- Streaming Providers Types ---
__turbopack_context__.s([
    "getAiringNowAnimeShows",
    ()=>getAiringNowAnimeShows,
    "getAiringNowCartoons",
    ()=>getAiringNowCartoons,
    "getAiringNowKDramas",
    ()=>getAiringNowKDramas,
    "getAiringNowShows",
    ()=>getAiringNowShows,
    "getAiringTodayShows",
    ()=>getAiringTodayShows,
    "getClassicAnimeShows",
    ()=>getClassicAnimeShows,
    "getCollectionDetails",
    ()=>getCollectionDetails,
    "getFamilyCartoonShows",
    ()=>getFamilyCartoonShows,
    "getImageUrl",
    ()=>getImageUrl,
    "getKidsFavoriteCartoons",
    ()=>getKidsFavoriteCartoons,
    "getMovieCredits",
    ()=>getMovieCredits,
    "getMovieDetails",
    ()=>getMovieDetails,
    "getMovieTrailers",
    ()=>getMovieTrailers,
    "getMovieWatchProviders",
    ()=>getMovieWatchProviders,
    "getMoviesByGenre",
    ()=>getMoviesByGenre,
    "getNewReleases",
    ()=>getNewReleases,
    "getPopularAnimeShows",
    ()=>getPopularAnimeShows,
    "getPopularCartoonShows",
    ()=>getPopularCartoonShows,
    "getPopularMovies",
    ()=>getPopularMovies,
    "getPopularTVShows",
    ()=>getPopularTVShows,
    "getSeasonDetails",
    ()=>getSeasonDetails,
    "getSimilarMovies",
    ()=>getSimilarMovies,
    "getSimilarTVShows",
    ()=>getSimilarTVShows,
    "getTVCredits",
    ()=>getTVCredits,
    "getTVShowDetails",
    ()=>getTVShowDetails,
    "getTVShowsByGenre",
    ()=>getTVShowsByGenre,
    "getTVTrailers",
    ()=>getTVTrailers,
    "getTVWatchProviders",
    ()=>getTVWatchProviders,
    "getTopRatedAnimeShows",
    ()=>getTopRatedAnimeShows,
    "getTopRatedCartoonShows",
    ()=>getTopRatedCartoonShows,
    "getTopRatedKDramas",
    ()=>getTopRatedKDramas,
    "getTopRatedMovies",
    ()=>getTopRatedMovies,
    "getTopRatedShows",
    ()=>getTopRatedShows,
    "getTrendingCartoons",
    ()=>getTrendingCartoons,
    "getTrendingMovies",
    ()=>getTrendingMovies,
    "getTrendingTVShows",
    ()=>getTrendingTVShows,
    "getUpcomingAnimeShows",
    ()=>getUpcomingAnimeShows,
    "getUpcomingCartoons",
    ()=>getUpcomingCartoons,
    "getUpcomingKDramas",
    ()=>getUpcomingKDramas,
    "getUpcomingMovies",
    ()=>getUpcomingMovies,
    "getUpcomingShows",
    ()=>getUpcomingShows,
    "searchTitles",
    ()=>searchTitles
]);
async function getMovieWatchProviders(movieId, country = 'US') {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch movie watch providers: ${response.status}`);
        }
        const data = await response.json();
        return data.results?.[country] ?? null;
    } catch (error) {
        console.error('Error fetching movie watch providers:', error);
        return null;
    }
}
async function getTVWatchProviders(tvId, country = 'US') {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/${tvId}/watch/providers?api_key=${TMDB_API_KEY}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch TV watch providers: ${response.status}`);
        }
        const data = await response.json();
        return data.results?.[country] ?? null;
    } catch (error) {
        console.error('Error fetching TV watch providers:', error);
        return null;
    }
}
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
async function getNewReleases(page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
            next: {
                revalidate: 86400
            }
        } // Cache for 24 hours (daily refresh)
        );
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching new releases:', error);
        return [];
    }
}
async function getTrendingMovies(page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch trending movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}
async function getTopRatedMovies(page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch top rated movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        return [];
    }
}
async function getPopularMovies(page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch popular movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}
async function getPopularTVShows(page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch TV shows');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching TV shows:', error);
        return [];
    }
}
async function getTrendingTVShows(page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch trending TV shows');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching trending TV shows:', error);
        return [];
    }
}
async function getTopRatedShows(page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch top rated shows');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching top rated shows:', error);
        return [];
    }
}
async function getUpcomingShows(page = 1) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const futureDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const response = await fetch(`${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&sort_by=first_air_date.desc&first_air_date.gte=${today}&first_air_date.lte=${futureDate}&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch upcoming shows');
        }
        const data = await response.json();
        // Filter to only include shows with first_air_date in the future
        return data.results.filter((show)=>show.first_air_date && new Date(show.first_air_date) >= new Date(today));
    } catch (error) {
        console.error('Error fetching upcoming shows:', error);
        return [];
    }
}
async function getAiringTodayShows(page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch shows airing today');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching airing today shows:', error);
        return [];
    }
}
async function getAiringNowShows(page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/on_the_air?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch shows on the air');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching on the air shows:', error);
        return [];
    }
}
async function getUpcomingMovies(page = 1) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&region=US&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch upcoming movies');
        }
        const data = await response.json();
        // Filter to only include movies with release_date in the future
        return data.results.filter((movie)=>movie.release_date && new Date(movie.release_date) >= new Date(today));
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        return [];
    }
}
function getImageUrl(path, size = 'original') {
    if (!path) return '/placeholder-movie.jpg';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}
async function getMovieDetails(movieId) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`, {
            next: {
                revalidate: 3600
            }
        });
        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
}
async function getTVShowDetails(tvId) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}&language=en-US`, {
            next: {
                revalidate: 3600
            }
        });
        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Failed to fetch TV show details: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching TV show details:', error);
        return null;
    }
}
async function getMovieCredits(movieId) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch movie credits: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data.cast) ? data.cast : [];
    } catch (error) {
        console.error('Error fetching movie credits:', error);
        return [];
    }
}
async function getTVCredits(tvId) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/${tvId}/credits?api_key=${TMDB_API_KEY}&language=en-US`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch TV credits: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data.cast) ? data.cast : [];
    } catch (error) {
        console.error('Error fetching TV credits:', error);
        return [];
    }
}
const MAX_TRAILER_FAILURES = 3;
let movieTrailerFailureCount = 0;
let tvTrailerFailureCount = 0;
async function getMovieTrailers(movieId) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.results || !Array.isArray(data.results)) {
            return [];
        }
        const videos = data.results.filter((video)=>video.site === 'YouTube');
        const teasers = videos.filter((video)=>video.type === 'Teaser' || video.name?.toLowerCase().includes('teaser'));
        return teasers.length > 0 ? teasers : videos;
    } catch (error) {
        movieTrailerFailureCount += 1;
        // if (movieTrailerFailureCount >= MAX_TRAILER_FAILURES) {
        //   movieTrailerFetchDisabled = true;
        // }
        console.error('Error fetching movie trailers:', error);
        return [];
    }
}
async function getTVTrailers(tvId) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/${tvId}/videos?api_key=${TMDB_API_KEY}&language=en-US`, {
            next: {
                revalidate: 3600
            }
        });
        if (response.status === 404) {
            // TV show or videos not found, return empty array gracefully
            return [];
        }
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.results || !Array.isArray(data.results)) {
            return [];
        }
        const videos = data.results.filter((video)=>video.site === 'YouTube');
        const teasers = videos.filter((video)=>video.type === 'Teaser' || video.name?.toLowerCase().includes('teaser'));
        return teasers.length > 0 ? teasers : videos;
    } catch (error) {
        tvTrailerFailureCount += 1;
        // if (tvTrailerFailureCount >= MAX_TRAILER_FAILURES) {
        //   tvTrailerFetchDisabled = true;
        // }
        console.error('Error fetching TV trailers:', error);
        return [];
    }
}
async function getMoviesByGenre(genreId, page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch movies by genre');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        return [];
    }
}
async function getTVShowsByGenre(genreId, page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch TV shows by genre');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching TV shows by genre:', error);
        return [];
    }
}
function formatDate(date) {
    return date.toISOString().split('T')[0];
}
async function discoverAnimationShows(params) {
    try {
        const searchParams = new URLSearchParams();
        searchParams.set('api_key', TMDB_API_KEY ?? '');
        searchParams.set('language', 'en-US');
        searchParams.set('page', params.page ?? '1');
        searchParams.set('include_adult', 'false');
        searchParams.set('include_null_first_air_dates', 'false');
        Object.entries(params).forEach(([key, value])=>{
            if (value) {
                searchParams.set(key, value);
            }
        });
        const response = await fetch(`${TMDB_BASE_URL}/discover/tv?${searchParams.toString()}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to discover animation shows');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error discovering animation shows:', error);
        return [];
    }
}
async function getAnimationChart({ chart, originalLanguage, includeKids, page = 1 }) {
    const baseParams = {
        sort_by: 'popularity.desc',
        'with_genres': includeKids ? '16,10762' : '16',
        page: page.toString(),
        'with_original_language': originalLanguage
    };
    switch(chart){
        case 'popular':
            baseParams.sort_by = 'popularity.desc';
            break;
        case 'topRated':
            baseParams.sort_by = 'vote_average.desc';
            baseParams['vote_count.gte'] = '200';
            break;
        case 'airingNow':
            baseParams.sort_by = 'popularity.desc';
            baseParams['first_air_date.lte'] = formatDate(new Date());
            baseParams['first_air_date.gte'] = formatDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
            break;
        case 'upcoming':
            baseParams.sort_by = 'popularity.desc';
            baseParams['first_air_date.gte'] = formatDate(new Date());
            break;
        case 'classics':
            baseParams.sort_by = 'vote_average.desc';
            baseParams['vote_count.gte'] = '500';
            const tenYearsAgo = new Date();
            tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
            baseParams['first_air_date.lte'] = formatDate(tenYearsAgo);
            break;
        case 'trending':
            baseParams.sort_by = 'popularity.desc';
            baseParams['first_air_date.gte'] = formatDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
            break;
        case 'family':
            baseParams.sort_by = 'vote_average.desc';
            baseParams['vote_count.gte'] = '100';
            break;
        case 'kids':
            baseParams.sort_by = 'popularity.desc';
            baseParams['vote_count.gte'] = '50';
            break;
    }
    return discoverAnimationShows(baseParams);
}
async function getPopularAnimeShows(page = 1) {
    return getAnimationChart({
        chart: 'popular',
        originalLanguage: 'ja',
        page
    });
}
async function getTopRatedAnimeShows(page = 1) {
    return getAnimationChart({
        chart: 'topRated',
        originalLanguage: 'ja',
        page
    });
}
async function getAiringNowAnimeShows(page = 1) {
    return getAnimationChart({
        chart: 'airingNow',
        originalLanguage: 'ja',
        page
    });
}
async function getUpcomingAnimeShows(page = 1) {
    return getAnimationChart({
        chart: 'upcoming',
        originalLanguage: 'ja',
        page
    });
}
async function getClassicAnimeShows(page = 1) {
    return getAnimationChart({
        chart: 'classics',
        originalLanguage: 'ja',
        page
    });
}
async function getPopularCartoonShows(page = 1) {
    return getAnimationChart({
        chart: 'popular',
        originalLanguage: 'en',
        includeKids: true,
        page
    });
}
async function getTopRatedCartoonShows(page = 1) {
    return getAnimationChart({
        chart: 'topRated',
        originalLanguage: 'en',
        includeKids: true,
        page
    });
}
async function getKidsFavoriteCartoons(page = 1) {
    return getAnimationChart({
        chart: 'kids',
        originalLanguage: 'en',
        includeKids: true,
        page
    });
}
async function getTrendingCartoons(page = 1) {
    return getAnimationChart({
        chart: 'trending',
        originalLanguage: 'en',
        includeKids: true,
        page
    });
}
async function getUpcomingCartoons(page = 1) {
    return getAnimationChart({
        chart: 'upcoming',
        originalLanguage: 'en',
        includeKids: true,
        page
    });
}
async function getAiringNowCartoons(page = 1) {
    return getAnimationChart({
        chart: 'airingNow',
        originalLanguage: 'en',
        includeKids: true,
        page
    });
}
async function getFamilyCartoonShows(page = 1) {
    return getAnimationChart({
        chart: 'family',
        originalLanguage: 'en',
        includeKids: true,
        page
    });
}
async function getKDramaChart({ chart, page = 1 }) {
    try {
        const searchParams = new URLSearchParams();
        searchParams.set('api_key', TMDB_API_KEY ?? '');
        searchParams.set('language', 'en-US');
        searchParams.set('page', page.toString());
        searchParams.set('include_adult', 'false');
        searchParams.set('include_null_first_air_dates', 'false');
        searchParams.set('with_genres', '18'); // Drama genre ID
        searchParams.set('with_origin_country', 'KR'); // South Korea
        searchParams.set('sort_by', chart === 'topRated' ? 'vote_average.desc' : 'first_air_date.desc');
        if (chart === 'topRated') {
            searchParams.set('vote_count.gte', '100');
        } else if (chart === 'upcoming') {
            const today = formatDate(new Date());
            searchParams.set('first_air_date.gte', today);
        } else if (chart === 'airingNow') {
            const today = formatDate(new Date());
            searchParams.set('first_air_date.lte', today);
            searchParams.set('first_air_date.gte', formatDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)));
        }
        const response = await fetch(`${TMDB_BASE_URL}/discover/tv?${searchParams.toString()}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error('Failed to discover K dramas');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error discovering K dramas:', error);
        return [];
    }
}
async function getTopRatedKDramas(page = 1) {
    return getKDramaChart({
        chart: 'topRated',
        page
    });
}
async function getAiringNowKDramas(page = 1) {
    return getKDramaChart({
        chart: 'airingNow',
        page
    });
}
async function getUpcomingKDramas(page = 1) {
    return getKDramaChart({
        chart: 'upcoming',
        page
    });
}
function normalizeString(value) {
    return value ?? '';
}
function normalizeNumber(value) {
    return Number.isFinite(value) ? Number(value) : 0;
}
async function searchTitles(query, page = 1) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
        return [];
    }
    try {
        const url = new URL(`${TMDB_BASE_URL}/search/multi`);
        url.searchParams.set('api_key', TMDB_API_KEY ?? '');
        url.searchParams.set('query', trimmedQuery);
        url.searchParams.set('language', 'en-US');
        url.searchParams.set('page', page.toString());
        url.searchParams.set('include_adult', 'false');
        const response = await fetch(url.toString(), {
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`Failed to search titles: ${response.status}`);
        }
        const data = await response.json();
        const results = Array.isArray(data.results) ? data.results : [];
        return results.filter((item)=>(item.media_type === 'movie' || item.media_type === 'tv') && item.id).map((item)=>{
            if (item.media_type === 'movie') {
                const movie = {
                    id: item.id,
                    title: normalizeString(item.title || item.name || 'Untitled'),
                    overview: normalizeString(item.overview),
                    backdrop_path: normalizeString(item.backdrop_path),
                    poster_path: normalizeString(item.poster_path),
                    release_date: normalizeString(item.release_date),
                    vote_average: normalizeNumber(item.vote_average),
                    popularity: 0,
                    genre_ids: item.genre_ids ?? [],
                    original_language: item.original_language
                };
                return movie;
            }
            const tvShow = {
                id: item.id,
                name: normalizeString(item.name || item.title || 'Untitled'),
                overview: normalizeString(item.overview),
                backdrop_path: normalizeString(item.backdrop_path),
                poster_path: normalizeString(item.poster_path),
                first_air_date: normalizeString(item.first_air_date),
                vote_average: normalizeNumber(item.vote_average),
                popularity: 0,
                genre_ids: item.genre_ids ?? [],
                original_language: item.original_language,
                origin_country: item.origin_country ?? []
            };
            return tvShow;
        });
    } catch (error) {
        console.error('Error searching titles:', error);
        return [];
    }
}
async function getSimilarMovies(movieId, page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch similar movies: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data.results) ? data.results : [];
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        return [];
    }
}
async function getSimilarTVShows(tvId, page = 1) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/${tvId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch similar TV shows: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data.results) ? data.results : [];
    } catch (error) {
        console.error('Error fetching similar TV shows:', error);
        return [];
    }
}
async function getCollectionDetails(collectionId) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/collection/${collectionId}?api_key=${TMDB_API_KEY}&language=en-US`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch collection details: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching collection details:', error);
        return null;
    }
}
async function getSeasonDetails(tvId, seasonNumber) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}&language=en-US`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch season details: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching season details:', error);
        return null;
    }
}
}),
"[project]/src/app/browse/search/SearchResultsContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchResultsContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/tmdb-client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function SearchResultsContent({ initialItems, query }) {
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialItems);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setItems(initialItems);
        setPage(1);
        setHasMore(true);
    }, [
        initialItems,
        query
    ]);
    const handleLoadMore = async ()=>{
        if (isLoading || !hasMore) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`/api/v1/search?q=${encodeURIComponent(query)}&page=${page + 1}`);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            const newItems = Array.isArray(data.items) ? data.items : [];
            if (newItems.length === 0) {
                setHasMore(false);
                return;
            }
            // Deduplicate items by ID to avoid duplicate key errors
            const existingIds = new Set(items.map((item)=>item.id));
            const uniqueNewItems = newItems.filter((item)=>!existingIds.has(item.id));
            if (uniqueNewItems.length === 0) {
                setHasMore(false);
                return;
            }
            setItems((prev)=>[
                    ...prev,
                    ...uniqueNewItems
                ]);
            setPage((prev)=>prev + 1);
        } catch (error) {
            console.error('Error loading more search results:', error);
        } finally{
            setIsLoading(false);
        }
    };
    if (items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-gray-400",
            children: [
                'No results found for "',
                query,
                '".'
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
            lineNumber: 65,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-300",
                children: [
                    "Showing ",
                    items.length,
                    " results"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
                children: items.map(({ id, title, posterPath, year, voteAverage, mediaType })=>{
                    const pathSegment = mediaType === 'movie' ? 'movies' : mediaType === 'tv' ? 'shows' : mediaType === 'anime' ? 'animes' : 'cartoons';
                    const href = `/title/${pathSegment}/${id}`;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: href,
                        className: "group cursor-pointer transition-all duration-300 hover:shadow-2xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-[2/3] overflow-hidden bg-gray-900 shadow-lg",
                            children: [
                                posterPath ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImageUrl"])(posterPath, 'w500'),
                                    alt: title,
                                    fill: true,
                                    className: "object-cover group-hover:scale-110 transition-transform duration-300",
                                    sizes: "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1536px) 20vw, 16vw"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                                    lineNumber: 84,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-full items-center justify-center text-xs text-gray-300 bg-gradient-to-br from-gray-700 to-gray-900 p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-center font-semibold line-clamp-3",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                                        lineNumber: 93,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                                    lineNumber: 92,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-white font-extrabold tracking-tight leading-none drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 line-clamp-3",
                                            children: title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                                            lineNumber: 99,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-xs text-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "mr-1",
                                                            children: "⭐"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                                                            lineNumber: 106,
                                                            columnNumber: 23
                                                        }, this),
                                                        voteAverage.toFixed(1)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 21
                                                }, this),
                                                year ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                                                            lineNumber: 111,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: year
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                                            lineNumber: 104,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                                    lineNumber: 98,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                            lineNumber: 82,
                            columnNumber: 15
                        }, this)
                    }, id, false, {
                        fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                        lineNumber: 77,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            hasMore ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center mt-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleLoadMore,
                    disabled: isLoading,
                    className: "px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    children: isLoading ? 'Loading...' : 'Load More'
                }, void 0, false, {
                    fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                    lineNumber: 124,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/browse/search/SearchResultsContent.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=src_d83bdff7._.js.map