(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api/tmdb-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
const TMDB_API_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TMDB_API_KEY;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/TitleHero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TitleHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/tmdb-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function formatRuntime(minutes) {
    if (!minutes || minutes <= 0) {
        return null;
    }
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    if (hours > 0) {
        return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
    }
    return `${remaining}m`;
}
function formatLanguage(code) {
    if (!code) {
        return null;
    }
    return code.length <= 3 ? code.toUpperCase() : code;
}
function TitleHero({ item, displayType, trailerType, children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [trailer, setTrailer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFetchingTrailer, setIsFetchingTrailer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [trailerError, setTrailerError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaved, setIsSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveError, setSaveError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleBack = ()=>{
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TitleHero.useEffect": ()=>{
            let cancelled = false;
            const loadTrailer = {
                "TitleHero.useEffect.loadTrailer": async ()=>{
                    setIsFetchingTrailer(true);
                    setTrailerError(false);
                    try {
                        const response = await fetch(`/api/v1/trailers?type=${trailerType}&id=${item.id}`, {
                            cache: 'no-store'
                        });
                        if (!response.ok) {
                            throw new Error(`Trailer request failed with status ${response.status}`);
                        }
                        const data = await response.json();
                        const videos = Array.isArray(data.results) ? data.results : [];
                        if (!cancelled) {
                            setTrailer(videos[0] ?? null);
                        }
                    } catch (error) {
                        console.error('Failed to load trailer:', error);
                        if (!cancelled) {
                            setTrailer(null);
                            setTrailerError(true);
                        }
                    } finally{
                        if (!cancelled) {
                            setIsFetchingTrailer(false);
                        }
                    }
                }
            }["TitleHero.useEffect.loadTrailer"];
            loadTrailer();
            return ({
                "TitleHero.useEffect": ()=>{
                    cancelled = true;
                }
            })["TitleHero.useEffect"];
        }
    }["TitleHero.useEffect"], [
        item.id,
        trailerType
    ]);
    const backgroundImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TitleHero.useMemo[backgroundImage]": ()=>{
            const source = item.backdropPath ?? item.posterPath ?? '';
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(source, 'original');
        }
    }["TitleHero.useMemo[backgroundImage]"], [
        item.backdropPath,
        item.posterPath
    ]);
    const runtimeLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TitleHero.useMemo[runtimeLabel]": ()=>formatRuntime(item.runtimeMinutes)
    }["TitleHero.useMemo[runtimeLabel]"], [
        item.runtimeMinutes
    ]);
    const languageLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TitleHero.useMemo[languageLabel]": ()=>formatLanguage(item.originalLanguage)
    }["TitleHero.useMemo[languageLabel]"], [
        item.originalLanguage
    ]);
    const hasGenres = Array.isArray(item.genres) && item.genres.length > 0;
    const ratingLabel = Number.isFinite(item.voteAverage) && item.voteAverage > 0 ? item.voteAverage.toFixed(1) : 'NR';
    const playButtonLabel = trailer ? 'Play Trailer' : isFetchingTrailer ? 'Loading Trailer...' : 'Trailer Unavailable';
    const saveLabel = isSaved ? 'Added to Library' : 'Add to Library';
    // Load saved titles from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TitleHero.useEffect": ()=>{
            try {
                const saved = localStorage.getItem('savedTitles');
                const savedTitles = saved ? JSON.parse(saved) : [];
                const isTitleSaved = savedTitles.some({
                    "TitleHero.useEffect.isTitleSaved": (title)=>title.id === item.id
                }["TitleHero.useEffect.isTitleSaved"]);
                setIsSaved(isTitleSaved);
            } catch (error) {
                console.error('Failed to load saved titles:', error);
            }
        }
    }["TitleHero.useEffect"], [
        item.id
    ]);
    const handleSave = ()=>{
        try {
            const saved = localStorage.getItem('savedTitles');
            const savedTitles = saved ? JSON.parse(saved) : [];
            if (!isSaved) {
                // Determine type and name based on what's available
                const titleType = displayType === 'Movie' ? 'movie' : 'show';
                const titleName = item.title;
                const newTitle = {
                    id: item.id,
                    title: titleName,
                    name: titleName,
                    type: titleType,
                    posterPath: item.posterPath ?? undefined,
                    rating: item.voteAverage,
                    releaseYear: item.releaseYear
                };
                savedTitles.push(newTitle);
                localStorage.setItem('savedTitles', JSON.stringify(savedTitles));
                setIsSaved(true);
            } else {
                // Remove from saved
                const updatedTitles = savedTitles.filter((title)=>title.id !== item.id);
                localStorage.setItem('savedTitles', JSON.stringify(updatedTitles));
                setIsSaved(false);
            }
            setSaveError(null);
        } catch (error) {
            console.error('Failed to save title:', error);
            setSaveError('Could not save this title right now.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen w-full overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-cover bg-center",
                style: {
                    backgroundImage: `url(${backgroundImage})`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/TitleHero.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/TitleHero.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent z-5"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/TitleHero.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 px-6 pt-32 pb-24 md:px-12 lg:px-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleBack,
                            className: "inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "←"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/TitleHero.tsx",
                                    lineNumber: 189,
                                    columnNumber: 11
                                }, this),
                                "Back"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                            lineNumber: 184,
                            columnNumber: 9
                        }, this),
                        item.tagline ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-8 text-lg text-white/70 italic",
                            children: item.tagline
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-white font-extrabold tracking-tight leading-none drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
                            children: item.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                            lineNumber: 197,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex flex-wrap items-center gap-3 text-white/80",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: "⭐"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 205,
                                            columnNumber: 13
                                        }, this),
                                        ratingLabel
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/TitleHero.tsx",
                                    lineNumber: 204,
                                    columnNumber: 11
                                }, this),
                                item.releaseYear ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: item.releaseYear
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 211,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true) : null,
                                runtimeLabel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: runtimeLabel
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 221,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: displayType
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 222,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true),
                                languageLabel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: languageLabel
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                            lineNumber: 203,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-6 text-lg text-gray-200 leading-relaxed max-w-2xl",
                            children: item.overview || 'No synopsis available for this title yet.'
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                            lineNumber: 232,
                            columnNumber: 9
                        }, this),
                        hasGenres ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex flex-wrap gap-2 text-sm text-white/80",
                            children: item.genres.map((genre)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm",
                                    children: genre
                                }, genre, false, {
                                    fileName: "[project]/src/components/sections/TitleHero.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-10 flex flex-wrap gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setIsModalOpen(true),
                                    disabled: !trailer,
                                    className: "inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-5 w-5",
                                            viewBox: "0 0 20 20",
                                            fill: "currentColor",
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/TitleHero.tsx",
                                                lineNumber: 257,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 256,
                                            columnNumber: 13
                                        }, this),
                                        playButtonLabel
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/TitleHero.tsx",
                                    lineNumber: 250,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleSave,
                                    className: `inline-flex items-center gap-2 rounded-lg px-8 py-3 font-semibold transition-colors ${isSaved ? 'border border-red-500/50 bg-red-500/20 text-white hover:bg-red-500/30' : 'border border-white/20 bg-white/10 text-white hover:bg-white/20'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: isSaved ? '♥' : '♡'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                                            lineNumber: 271,
                                            columnNumber: 13
                                        }, this),
                                        saveLabel
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/TitleHero.tsx",
                                    lineNumber: 262,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                            lineNumber: 249,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/TitleHero.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/TitleHero.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 px-6 md:px-12 lg:px-16 pt-30",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/sections/TitleHero.tsx",
                lineNumber: 278,
                columnNumber: 19
            }, this) : null,
            isModalOpen && trailer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full max-w-4xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setIsModalOpen(false),
                            className: "absolute -top-10 right-0 text-white transition-colors hover:text-gray-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "h-8 w-8",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/TitleHero.tsx",
                                    lineNumber: 288,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/TitleHero.tsx",
                                lineNumber: 287,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                            lineNumber: 282,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "aspect-video overflow-hidden rounded-lg bg-black",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                width: "100%",
                                height: "100%",
                                src: `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&rel=0`,
                                title: trailer.name,
                                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
                                allowFullScreen: true,
                                frameBorder: 0
                            }, trailer.key, false, {
                                fileName: "[project]/src/components/sections/TitleHero.tsx",
                                lineNumber: 292,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/TitleHero.tsx",
                            lineNumber: 291,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/TitleHero.tsx",
                    lineNumber: 281,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/TitleHero.tsx",
                lineNumber: 280,
                columnNumber: 9
            }, this) : null,
            trailerError && !trailer && !isFetchingTrailer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-10 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 rounded-lg border border-white/10 bg-black/80 px-4 py-3 text-center text-sm text-white/80",
                children: "Trailer could not be loaded right now."
            }, void 0, false, {
                fileName: "[project]/src/components/sections/TitleHero.tsx",
                lineNumber: 308,
                columnNumber: 9
            }, this) : null,
            saveError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-10 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 rounded-lg border border-white/10 bg-black/80 px-4 py-3 text-center text-sm text-red-300",
                children: saveError
            }, void 0, false, {
                fileName: "[project]/src/components/sections/TitleHero.tsx",
                lineNumber: 314,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/TitleHero.tsx",
        lineNumber: 174,
        columnNumber: 5
    }, this);
}
_s(TitleHero, "nqh3G5zoSHuXt9BixES83MOd9d0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TitleHero;
var _c;
__turbopack_context__.k.register(_c, "TitleHero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/TitleCastSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TitleCastSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/tmdb-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const MAX_CAST_ITEMS = 18;
const ITEMS_PER_PAGE = 6;
function TitleCastSection({ cast, variant = 'standalone' }) {
    _s();
    if (!cast || cast.length === 0) {
        return null;
    }
    const sorted = [
        ...cast
    ].filter((member)=>Boolean(member.name)).sort((a, b)=>{
        const orderA = Number.isFinite(a.order) ? a.order : Number.MAX_SAFE_INTEGER;
        const orderB = Number.isFinite(b.order) ? b.order : Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    }).slice(0, MAX_CAST_ITEMS);
    if (sorted.length === 0) {
        return null;
    }
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TitleCastSection.useEffect": ()=>{
            setCurrentPage({
                "TitleCastSection.useEffect": (prev)=>Math.min(prev, totalPages - 1)
            }["TitleCastSection.useEffect"]);
        }
    }["TitleCastSection.useEffect"], [
        totalPages
    ]);
    const safePage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TitleCastSection.useMemo[safePage]": ()=>{
            return Math.min(currentPage, totalPages - 1);
        }
    }["TitleCastSection.useMemo[safePage]"], [
        currentPage,
        totalPages
    ]);
    const startIndex = safePage * ITEMS_PER_PAGE;
    const visibleCast = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const containerClass = variant === 'overlay' ? 'rounded-2xl border border-white/10 bg-black/50 pb-6 pt-4 backdrop-blur-md shadow-xl' : 'py-2';
    const headingClass = variant === 'overlay' ? 'text-lg font-semibold text-white/90' : 'text-2xl font-semibold text-white';
    const controlsClass = variant === 'overlay' ? 'flex items-center justify-between gap-4 mb-4' : 'flex items-center justify-between gap-4 mb-8';
    const rowClass = variant === 'overlay' ? 'flex flex-nowrap justify-center gap-4' : 'flex flex-nowrap justify-center gap-8';
    const navButtonClass = variant === 'overlay' ? 'p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed' : 'p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
    const goToPage = (page)=>{
        setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
    };
    const goToPrev = ()=>{
        setCurrentPage((prev)=>Math.max(0, prev - 1));
    };
    const goToNext = ()=>{
        setCurrentPage((prev)=>Math.min(totalPages - 1, prev + 1));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: containerClass,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: controlsClass,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: headingClass,
                        children: "Cast"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    totalPages > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: goToPrev,
                                disabled: safePage === 0,
                                className: navButtonClass,
                                "aria-label": "Previous cast page",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 19l-7-7 7-7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: goToNext,
                                disabled: safePage >= totalPages - 1,
                                className: navButtonClass,
                                "aria-label": "Next cast page",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 5l7 7-7 7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: rowClass,
                role: "list",
                children: visibleCast.map((member)=>{
                    const profilePath = member.profile_path ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(member.profile_path, 'w500') : null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-40 flex-col items-center gap-3 text-center text-sm text-white/80",
                        role: "listitem",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-36 w-36 overflow-hidden rounded-full border border-white/10 bg-white/5",
                                children: profilePath ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: profilePath,
                                    alt: member.name,
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "144px"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                    lineNumber: 128,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-full w-full items-center justify-center text-xs text-white/60",
                                    children: "No Photo"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                    lineNumber: 136,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-white line-clamp-2",
                                        children: member.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                        lineNumber: 142,
                                        columnNumber: 17
                                    }, this),
                                    member.character ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-white/60 line-clamp-2",
                                        children: member.character
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                        lineNumber: 144,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                                lineNumber: 141,
                                columnNumber: 15
                            }, this)
                        ]
                    }, member.id, true, {
                        fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                        lineNumber: 121,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            totalPages > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 flex justify-center gap-2",
                children: Array.from({
                    length: totalPages
                }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>goToPage(index),
                        className: `h-2 w-2 rounded-full transition-colors ${safePage === index ? 'bg-red-500' : 'bg-white/30 hover:bg-white/60'}`,
                        "aria-label": `Go to cast page ${index + 1}`
                    }, index, false, {
                        fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                        lineNumber: 155,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/sections/TitleCastSection.tsx",
                lineNumber: 153,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/TitleCastSection.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(TitleCastSection, "sIk8a/RaFAu5+yfRMHrRbAhI+YY=");
_c = TitleCastSection;
var _c;
__turbopack_context__.k.register(_c, "TitleCastSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/SimilarTitles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SimilarTitles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/tmdb-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/url.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function SimilarTitles({ items, titleType }) {
    _s();
    if (!items || items.length === 0) {
        return null;
    }
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [canScrollLeft, setCanScrollLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canScrollRight, setCanScrollRight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const checkScroll = ()=>{
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SimilarTitles.useEffect": ()=>{
            checkScroll();
            const scrollContainer = scrollContainerRef.current;
            if (scrollContainer) {
                scrollContainer.addEventListener('scroll', checkScroll);
                return ({
                    "SimilarTitles.useEffect": ()=>scrollContainer.removeEventListener('scroll', checkScroll)
                })["SimilarTitles.useEffect"];
            }
        }
    }["SimilarTitles.useEffect"], []);
    const scrollLeft = ()=>{
        if (scrollContainerRef.current) {
            const containerWidth = scrollContainerRef.current.clientWidth;
            const itemWidth = 206;
            const itemsToScroll = Math.floor(containerWidth / itemWidth);
            const scrollAmount = itemsToScroll * itemWidth;
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    const scrollRight = ()=>{
        if (scrollContainerRef.current) {
            const containerWidth = scrollContainerRef.current.clientWidth;
            const itemWidth = 206;
            const itemsToScroll = Math.floor(containerWidth / itemWidth);
            const scrollAmount = itemsToScroll * itemWidth;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    const getItemTitle = (item)=>{
        return 'title' in item ? item.title : item.name;
    };
    const getItemDate = (item)=>{
        return 'release_date' in item ? item.release_date : item.first_air_date;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-6639e4eac6b78d61" + " " + "py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6639e4eac6b78d61" + " " + "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "jsx-6639e4eac6b78d61" + " " + "text-2xl font-bold text-white",
                        children: "Similar Titles"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6639e4eac6b78d61" + " " + "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: scrollLeft,
                                disabled: !canScrollLeft,
                                "aria-label": "Scroll left",
                                className: "jsx-6639e4eac6b78d61" + " " + `p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    className: "jsx-6639e4eac6b78d61" + " " + "w-5 h-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 19l-7-7 7-7",
                                        className: "jsx-6639e4eac6b78d61"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: scrollRight,
                                disabled: !canScrollRight,
                                "aria-label": "Scroll right",
                                className: "jsx-6639e4eac6b78d61" + " " + `p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : ''}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    className: "jsx-6639e4eac6b78d61" + " " + "w-5 h-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 5l7 7-7 7",
                                        className: "jsx-6639e4eac6b78d61"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollContainerRef,
                className: "jsx-6639e4eac6b78d61" + " " + "flex gap-2 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory",
                children: items.map((item)=>{
                    const title = getItemTitle(item);
                    const date = getItemDate(item);
                    const year = date ? new Date(date).getFullYear() : '';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTitleUrl"])(titleType, item.id),
                        className: "flex-shrink-0 w-[190px] cursor-pointer group transition-transform hover:scale-105 snap-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6639e4eac6b78d61" + " " + "relative aspect-[2/3] overflow-hidden bg-gray-800 shadow-lg",
                            children: [
                                item.poster_path ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(item.poster_path, 'w500'),
                                    alt: title,
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "200px"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                    lineNumber: 117,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6639e4eac6b78d61" + " " + "w-full h-full flex items-center justify-center text-gray-300 bg-gradient-to-br from-gray-700 to-gray-900 p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-6639e4eac6b78d61" + " " + "text-center font-semibold line-clamp-3 text-sm",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                        lineNumber: 126,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                    lineNumber: 125,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6639e4eac6b78d61" + " " + "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "jsx-6639e4eac6b78d61" + " " + "text-white font-semibold text-sm mb-1 line-clamp-2",
                                            children: title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                            lineNumber: 133,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6639e4eac6b78d61" + " " + "flex items-center gap-2 text-xs text-gray-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6639e4eac6b78d61",
                                                    children: [
                                                        "⭐ ",
                                                        item.vote_average.toFixed(1)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6639e4eac6b78d61",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6639e4eac6b78d61",
                                                    children: year
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                                    lineNumber: 132,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/sections/SimilarTitles.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "6639e4eac6b78d61",
                children: ".scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/SimilarTitles.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(SimilarTitles, "Sp7lZ+wm9Cxomje/zubieCAw9fM=");
_c = SimilarTitles;
var _c;
__turbopack_context__.k.register(_c, "SimilarTitles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/MerchandiseSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MerchandiseSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/url.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function MerchandiseSection({ items, title = 'More from this Franchise' }) {
    _s();
    if (!items || items.length === 0) {
        return null;
    }
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [canScrollLeft, setCanScrollLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canScrollRight, setCanScrollRight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const checkScroll = ()=>{
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MerchandiseSection.useEffect": ()=>{
            checkScroll();
            const scrollContainer = scrollContainerRef.current;
            if (scrollContainer) {
                scrollContainer.addEventListener('scroll', checkScroll);
                return ({
                    "MerchandiseSection.useEffect": ()=>scrollContainer.removeEventListener('scroll', checkScroll)
                })["MerchandiseSection.useEffect"];
            }
        }
    }["MerchandiseSection.useEffect"], []);
    const scrollLeft = ()=>{
        if (scrollContainerRef.current) {
            const containerWidth = scrollContainerRef.current.clientWidth;
            const itemWidth = 206;
            const itemsToScroll = Math.floor(containerWidth / itemWidth);
            const scrollAmount = itemsToScroll * itemWidth;
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    const scrollRight = ()=>{
        if (scrollContainerRef.current) {
            const containerWidth = scrollContainerRef.current.clientWidth;
            const itemWidth = 206;
            const itemsToScroll = Math.floor(containerWidth / itemWidth);
            const scrollAmount = itemsToScroll * itemWidth;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-6639e4eac6b78d61" + " " + "py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6639e4eac6b78d61" + " " + "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "jsx-6639e4eac6b78d61" + " " + "text-2xl font-bold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6639e4eac6b78d61" + " " + "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: scrollLeft,
                                disabled: !canScrollLeft,
                                "aria-label": "Scroll left",
                                className: "jsx-6639e4eac6b78d61" + " " + `p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    className: "jsx-6639e4eac6b78d61" + " " + "w-5 h-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 19l-7-7 7-7",
                                        className: "jsx-6639e4eac6b78d61"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: scrollRight,
                                disabled: !canScrollRight,
                                "aria-label": "Scroll right",
                                className: "jsx-6639e4eac6b78d61" + " " + `p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : ''}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    className: "jsx-6639e4eac6b78d61" + " " + "w-5 h-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 5l7 7-7 7",
                                        className: "jsx-6639e4eac6b78d61"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollContainerRef,
                className: "jsx-6639e4eac6b78d61" + " " + "flex gap-2 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory",
                children: items.map((item)=>{
                    const year = item.releaseDate ? new Date(item.releaseDate).getFullYear() : '';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTitleUrl"])('movies', item.id),
                        className: "flex-shrink-0 w-[190px] cursor-pointer group transition-transform hover:scale-105 snap-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6639e4eac6b78d61" + " " + "relative aspect-[2/3] overflow-hidden bg-gray-800 shadow-lg",
                            children: [
                                item.posterPath ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: `https://image.tmdb.org/t/p/w500${item.posterPath}`,
                                    alt: item.title,
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "200px"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                    lineNumber: 113,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6639e4eac6b78d61" + " " + "w-full h-full flex items-center justify-center text-gray-300 bg-gradient-to-br from-gray-700 to-gray-900 p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-6639e4eac6b78d61" + " " + "text-center font-semibold line-clamp-3 text-sm",
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                        lineNumber: 122,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                    lineNumber: 121,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6639e4eac6b78d61" + " " + "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "jsx-6639e4eac6b78d61" + " " + "text-white font-semibold text-sm mb-1 line-clamp-2",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                            lineNumber: 129,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6639e4eac6b78d61" + " " + "flex items-center gap-2 text-xs text-gray-300",
                                            children: [
                                                item.voteAverage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-6639e4eac6b78d61",
                                                            children: [
                                                                "⭐ ",
                                                                item.voteAverage.toFixed(1)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-6639e4eac6b78d61",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                                            lineNumber: 136,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-6639e4eac6b78d61",
                                                    children: year
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                            lineNumber: 132,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                                    lineNumber: 128,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                            lineNumber: 111,
                            columnNumber: 15
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                        lineNumber: 106,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "6639e4eac6b78d61",
                children: ".scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/MerchandiseSection.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(MerchandiseSection, "Sp7lZ+wm9Cxomje/zubieCAw9fM=");
_c = MerchandiseSection;
var _c;
__turbopack_context__.k.register(_c, "MerchandiseSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/EpisodesSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EpisodesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function EpisodesSection({ seasons, tvId }) {
    _s();
    if (!seasons || seasons.length === 0) {
        return null;
    }
    const [selectedSeason, setSelectedSeason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [episodes, setEpisodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [canScrollLeft, setCanScrollLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canScrollRight, setCanScrollRight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const currentSeason = seasons[selectedSeason];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EpisodesSection.useEffect": ()=>{
            const fetchEpisodes = {
                "EpisodesSection.useEffect.fetchEpisodes": async ()=>{
                    setLoading(true);
                    try {
                        const response = await fetch(`/api/v1/episodes?tvId=${tvId}&seasonNumber=${currentSeason.season_number}`);
                        const data = await response.json();
                        setEpisodes(data.episodes || []);
                    } catch (error) {
                        console.error('Error fetching episodes:', error);
                        setEpisodes([]);
                    } finally{
                        setLoading(false);
                    }
                }
            }["EpisodesSection.useEffect.fetchEpisodes"];
            fetchEpisodes();
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft = 0;
            }
        }
    }["EpisodesSection.useEffect"], [
        selectedSeason,
        currentSeason.season_number,
        tvId
    ]);
    const checkScroll = ()=>{
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EpisodesSection.useEffect": ()=>{
            checkScroll();
            const scrollContainer = scrollContainerRef.current;
            if (scrollContainer) {
                scrollContainer.addEventListener('scroll', checkScroll);
                return ({
                    "EpisodesSection.useEffect": ()=>scrollContainer.removeEventListener('scroll', checkScroll)
                })["EpisodesSection.useEffect"];
            }
        }
    }["EpisodesSection.useEffect"], [
        episodes
    ]);
    const scrollLeft = ()=>{
        if (scrollContainerRef.current) {
            const itemWidth = 300;
            const gap = 40;
            const scrollAmount = 4 * (itemWidth + gap);
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    const scrollRight = ()=>{
        if (scrollContainerRef.current) {
            const itemWidth = 300;
            const gap = 40;
            const scrollAmount = 4 * (itemWidth + gap);
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-6639e4eac6b78d61" + " " + "py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6639e4eac6b78d61" + " " + "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "jsx-6639e4eac6b78d61" + " " + "text-2xl font-bold text-white",
                        children: "Episodes"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6639e4eac6b78d61" + " " + "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6639e4eac6b78d61" + " " + "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedSeason,
                                        onChange: (e)=>{
                                            setSelectedSeason(Number(e.target.value));
                                        },
                                        className: "jsx-6639e4eac6b78d61" + " " + "appearance-none px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors cursor-pointer border border-gray-700 pr-10 text-sm",
                                        children: seasons.map((season, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: idx,
                                                className: "jsx-6639e4eac6b78d61",
                                                children: season.name
                                            }, season.season_number, false, {
                                                fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                                lineNumber: 110,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        className: "jsx-6639e4eac6b78d61" + " " + "absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 14l-7 7m0 0l-7-7m7 7V3",
                                            className: "jsx-6639e4eac6b78d61"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            !loading && episodes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-6639e4eac6b78d61" + " " + "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: scrollLeft,
                                        disabled: !canScrollLeft,
                                        "aria-label": "Scroll left",
                                        className: "jsx-6639e4eac6b78d61" + " " + `p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            className: "jsx-6639e4eac6b78d61" + " " + "w-5 h-5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M15 19l-7-7 7-7",
                                                className: "jsx-6639e4eac6b78d61"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                                lineNumber: 135,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: scrollRight,
                                        disabled: !canScrollRight,
                                        "aria-label": "Scroll right",
                                        className: "jsx-6639e4eac6b78d61" + " " + `p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            className: "jsx-6639e4eac6b78d61" + " " + "w-5 h-5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M9 5l7 7-7 7",
                                                className: "jsx-6639e4eac6b78d61"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                                lineNumber: 147,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                            lineNumber: 146,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6639e4eac6b78d61" + " " + "flex items-center justify-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-6639e4eac6b78d61" + " " + "animate-spin rounded-full h-8 w-8 border-t-2 border-white"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                    lineNumber: 157,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, this) : episodes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6639e4eac6b78d61" + " " + "text-center py-12 text-gray-400",
                children: "No episodes available"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                lineNumber: 160,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollContainerRef,
                className: "jsx-6639e4eac6b78d61" + " " + "flex gap-10 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory",
                children: episodes.map((episode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-6639e4eac6b78d61" + " " + "flex-shrink-0 w-[300px] cursor-pointer group transition-transform hover:scale-105 snap-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6639e4eac6b78d61" + " " + "relative aspect-video overflow-hidden bg-gray-800 shadow-lg rounded-lg",
                            children: [
                                episode.still_path ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: `https://image.tmdb.org/t/p/w500${episode.still_path}`,
                                    alt: episode.name,
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "300px"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                    lineNumber: 173,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6639e4eac6b78d61" + " " + "w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 text-gray-300 p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-6639e4eac6b78d61" + " " + "text-center font-semibold line-clamp-3 text-xs",
                                        children: episode.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                        lineNumber: 182,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                    lineNumber: 181,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6639e4eac6b78d61" + " " + "absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-6639e4eac6b78d61" + " " + "flex items-start justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-6639e4eac6b78d61",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-6639e4eac6b78d61" + " " + "text-xs text-gray-300 mb-1",
                                                            children: [
                                                                "E",
                                                                String(episode.episode_number).padStart(2, '0')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-6639e4eac6b78d61" + " " + "text-sm font-semibold text-white line-clamp-2",
                                                            children: episode.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 21
                                                }, this),
                                                episode.vote_average > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-6639e4eac6b78d61" + " " + "flex items-center gap-1 ml-2 flex-shrink-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-6639e4eac6b78d61" + " " + "text-xs text-yellow-400",
                                                            children: "⭐"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-6639e4eac6b78d61" + " " + "text-xs text-gray-300",
                                                            children: episode.vote_average.toFixed(1)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                            lineNumber: 189,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-6639e4eac6b78d61" + " " + "text-xs text-gray-400 mb-2",
                                            children: new Date(episode.air_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-6639e4eac6b78d61" + " " + "text-xs text-gray-400 line-clamp-3",
                                            children: episode.overview || 'No description available'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                            lineNumber: 214,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                                    lineNumber: 188,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                            lineNumber: 171,
                            columnNumber: 15
                        }, this)
                    }, episode.id, false, {
                        fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                        lineNumber: 167,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/sections/EpisodesSection.tsx",
                lineNumber: 162,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "6639e4eac6b78d61",
                children: ".scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/EpisodesSection.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s(EpisodesSection, "kP8+xLemEVUmNbRMto12MG3NBJg=");
_c = EpisodesSection;
var _c;
__turbopack_context__.k.register(_c, "EpisodesSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_c638aa69._.js.map