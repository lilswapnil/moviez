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
"[project]/src/components/media/FeaturedBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeaturedBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/tmdb-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function hashString(value) {
    let hash = 0;
    for(let i = 0; i < value.length; i += 1){
        hash = hash * 31 + value.charCodeAt(i) >>> 0;
    }
    return hash || 1;
}
function shuffleWithSeed(items, seed) {
    const copy = [
        ...items
    ];
    if (copy.length <= 1) {
        return copy;
    }
    let currentSeed = seed;
    for(let i = copy.length - 1; i > 0; i -= 1){
        currentSeed = currentSeed * 1664525 + 1013904223 >>> 0;
        const j = currentSeed % (i + 1);
        [copy[i], copy[j]] = [
            copy[j],
            copy[i]
        ];
    }
    return copy;
}
function isLandscapeVideo(videoId) {
    // YouTube Shorts have IDs with specific patterns, but for safety
    // we assume landscape by default. In practice, Teaser/Trailer types
    // are almost always landscape format videos.
    return true;
}
function FeaturedBanner({ movies = [], shows = [], anime = [], cartoon = [], kdrama = [], international = [] }) {
    _s();
    // Track which poster is hovered: 'prev', 'next', or null
    const [hoveredPoster, setHoveredPoster] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [trailer, setTrailer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showTrailer, setShowTrailer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const trailerFailureCountsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const trailerCacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const MAX_TRAILER_FAILURES = 3;
    const allItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FeaturedBanner.useMemo[allItems]": ()=>{
            const movieSeed = hashString(`movie:${movies.map({
                "FeaturedBanner.useMemo[allItems].movieSeed": (movie)=>movie.id
            }["FeaturedBanner.useMemo[allItems].movieSeed"]).join('-')}`);
            const showSeed = hashString(`tv:${shows.map({
                "FeaturedBanner.useMemo[allItems].showSeed": (show)=>show.id
            }["FeaturedBanner.useMemo[allItems].showSeed"]).join('-')}`);
            const animeSeed = hashString(`anime:${anime.map({
                "FeaturedBanner.useMemo[allItems].animeSeed": (item)=>item.id
            }["FeaturedBanner.useMemo[allItems].animeSeed"]).join('-')}`);
            const cartoonSeed = hashString(`cartoon:${cartoon.map({
                "FeaturedBanner.useMemo[allItems].cartoonSeed": (item)=>item.id
            }["FeaturedBanner.useMemo[allItems].cartoonSeed"]).join('-')}`);
            const kdramaSeed = hashString(`kdrama:${kdrama.map({
                "FeaturedBanner.useMemo[allItems].kdramaSeed": (item)=>item.id
            }["FeaturedBanner.useMemo[allItems].kdramaSeed"]).join('-')}`);
            const internationalSeed = hashString(`international:${international.map({
                "FeaturedBanner.useMemo[allItems].internationalSeed": (item)=>item.id
            }["FeaturedBanner.useMemo[allItems].internationalSeed"]).join('-')}`);
            const movieItems = shuffleWithSeed(movies.map({
                "FeaturedBanner.useMemo[allItems].movieItems": (movie)=>({
                        ...movie,
                        kind: 'movie',
                        title: movie.title,
                        release_date: movie.release_date
                    })
            }["FeaturedBanner.useMemo[allItems].movieItems"]), movieSeed);
            const showItems = shuffleWithSeed(shows.map({
                "FeaturedBanner.useMemo[allItems].showItems": (show)=>({
                        ...show,
                        kind: 'tv',
                        name: show.name,
                        first_air_date: show.first_air_date
                    })
            }["FeaturedBanner.useMemo[allItems].showItems"]), showSeed);
            const animeItems = shuffleWithSeed(anime.map({
                "FeaturedBanner.useMemo[allItems].animeItems": (show)=>({
                        ...show,
                        kind: 'anime',
                        name: show.name,
                        first_air_date: show.first_air_date
                    })
            }["FeaturedBanner.useMemo[allItems].animeItems"]), animeSeed);
            const cartoonItems = shuffleWithSeed(cartoon.map({
                "FeaturedBanner.useMemo[allItems].cartoonItems": (show)=>({
                        ...show,
                        kind: 'cartoon',
                        name: show.name,
                        first_air_date: show.first_air_date
                    })
            }["FeaturedBanner.useMemo[allItems].cartoonItems"]), cartoonSeed);
            const kdramaItems = shuffleWithSeed(kdrama.map({
                "FeaturedBanner.useMemo[allItems].kdramaItems": (show)=>({
                        ...show,
                        kind: 'kdrama',
                        name: show.name,
                        first_air_date: show.first_air_date
                    })
            }["FeaturedBanner.useMemo[allItems].kdramaItems"]), kdramaSeed);
            const internationalItems = shuffleWithSeed(international.map({
                "FeaturedBanner.useMemo[allItems].internationalItems": (movie)=>({
                        ...movie,
                        kind: 'international',
                        title: movie.title,
                        release_date: movie.release_date
                    })
            }["FeaturedBanner.useMemo[allItems].internationalItems"]), internationalSeed);
            const buckets = [
                movieItems,
                showItems,
                animeItems,
                cartoonItems,
                kdramaItems,
                internationalItems
            ];
            const interleaved = [];
            const combinedKey = buckets.flat().map({
                "FeaturedBanner.useMemo[allItems].combinedKey": (item)=>`${item.kind}-${item.id}`
            }["FeaturedBanner.useMemo[allItems].combinedKey"]).join('|');
            const startIndex = hashString(combinedKey) % (buckets.length || 1);
            let bucketIndex = startIndex;
            while(interleaved.length < 10 && buckets.some({
                "FeaturedBanner.useMemo[allItems]": (bucket)=>bucket.length > 0
            }["FeaturedBanner.useMemo[allItems]"])){
                const bucket = buckets[bucketIndex % buckets.length];
                if (bucket.length > 0) {
                    interleaved.push(bucket.shift());
                }
                bucketIndex += 1;
            }
            return interleaved;
        }
    }["FeaturedBanner.useMemo[allItems]"], [
        anime,
        cartoon,
        movies,
        shows,
        kdrama,
        international
    ]);
    const safeIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FeaturedBanner.useMemo[safeIndex]": ()=>{
            if (allItems.length === 0) {
                return 0;
            }
            return Math.min(currentIndex, allItems.length - 1);
        }
    }["FeaturedBanner.useMemo[safeIndex]"], [
        allItems.length,
        currentIndex
    ]);
    const featuredItem = allItems[safeIndex];
    // Fetch trailer when item changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeaturedBanner.useEffect": ()=>{
            if (!featuredItem) return;
            let cancelled = false;
            setTrailer(null);
            setShowTrailer(false);
            setIsPlaying(false);
            const fetchTrailer = {
                "FeaturedBanner.useEffect.fetchTrailer": async ()=>{
                    try {
                        const response = await fetch(`/api/v1/trailers?type=${featuredItem.kind}&id=${featuredItem.id}`, {
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
                        }
                    }
                }
            }["FeaturedBanner.useEffect.fetchTrailer"];
            fetchTrailer();
            return ({
                "FeaturedBanner.useEffect": ()=>{
                    cancelled = true;
                }
            })["FeaturedBanner.useEffect"];
        }
    }["FeaturedBanner.useEffect"], [
        featuredItem,
        featuredItem?.id,
        featuredItem?.kind
    ]);
    const goToNext = ()=>{
        if (allItems.length === 0) return;
        setCurrentIndex((prev)=>(prev + 1) % allItems.length);
    };
    const goToPrev = ()=>{
        if (allItems.length === 0) return;
        setCurrentIndex((prev)=>(prev - 1 + allItems.length) % allItems.length);
    };
    const goToSlide = (index)=>{
        setCurrentIndex(index);
    };
    // Auto-slide logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeaturedBanner.useEffect": ()=>{
            if (allItems.length <= 1) return;
            if (showTrailer && isPlaying) return; // Pause auto-slide when trailer is playing
            const interval = setInterval({
                "FeaturedBanner.useEffect.interval": ()=>{
                    setCurrentIndex({
                        "FeaturedBanner.useEffect.interval": (prev)=>(prev + 1) % allItems.length
                    }["FeaturedBanner.useEffect.interval"]);
                }
            }["FeaturedBanner.useEffect.interval"], 6000); // 6 seconds per slide
            return ({
                "FeaturedBanner.useEffect": ()=>clearInterval(interval)
            })["FeaturedBanner.useEffect"];
        }
    }["FeaturedBanner.useEffect"], [
        allItems.length,
        showTrailer,
        isPlaying
    ]);
    if (!featuredItem) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative min-h-screen mx-4 mb-8 rounded-sm overflow-hidden bg-gray-900 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-500 text-xl",
                children: "Loading featured content..."
            }, void 0, false, {
                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                lineNumber: 232,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/media/FeaturedBanner.tsx",
            lineNumber: 231,
            columnNumber: 7
        }, this);
    }
    // Compute the next two items' posters for preview
    // Compute the next item's poster for preview
    const nextIndex = allItems.length > 1 ? (safeIndex + 1) % allItems.length : 0;
    const nextItem = allItems[nextIndex];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen mb-8 rounded-2xl overflow-hidden group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                initial: false,
                mode: "wait",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        x: 80
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    exit: {
                        opacity: 0,
                        x: -80
                    },
                    transition: {
                        duration: 0.5,
                        ease: 'easeInOut'
                    },
                    className: `absolute inset-0 w-full h-full ${hoveredPoster ? 'backdrop-blur-md' : ''}`,
                    style: {
                        zIndex: 0
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-cover bg-center z-0",
                        style: {
                            backgroundImage: `url(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(featuredItem.backdrop_path)})`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, this)
                }, featuredItem.id, false, {
                    fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                    lineNumber: 245,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            showTrailer && isPlaying && trailer && trailer.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                    width: "100%",
                    height: "100%",
                    src: `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&rel=0&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3`,
                    title: trailer.name,
                    frameBorder: "0",
                    allowFullScreen: true,
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
                    className: "absolute inset-0 w-full h-full"
                }, trailer.key, false, {
                    fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                    lineNumber: 265,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10 transition-opacity duration-500 ${showTrailer && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`
            }, void 0, false, {
                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                lineNumber: 280,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute top-24 left-12 z-20 max-w-4xl pointer-events-none transition-opacity duration-500 ${showTrailer && isPlaying ? 'opacity-0' : 'opacity-100'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: " text-white font-extrabold tracking-tight leading-none drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl ",
                    children: featuredItem.title || featuredItem.name
                }, void 0, false, {
                    fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            !(showTrailer && isPlaying) && nextItem && nextItem.poster_path && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed md:absolute right-8 bottom-8 z-30",
                style: {
                    pointerEvents: 'auto'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-32 aspect-[2/3] overflow-hidden bg-gray-800 shadow-lg rounded-lg border-2 border-white/40 transition-transform duration-300 hover:scale-105",
                    style: {
                        cursor: 'pointer'
                    },
                    onClick: ()=>setCurrentIndex(nextIndex),
                    title: nextItem.title || nextItem.name || 'Next',
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(nextItem.poster_path, 'w500'),
                        alt: nextItem.title || nextItem.name || 'Next Poster',
                        fill: true,
                        className: "object-cover",
                        sizes: "200px",
                        draggable: false,
                        priority: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                        lineNumber: 315,
                        columnNumber: 13
                    }, this)
                }, nextItem.id, false, {
                    fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                    lineNumber: 308,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                lineNumber: 304,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute bottom-0 left-0 z-20 pb-24 px-12 max-w-2xl`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-xl text-gray-300 mb-4 leading-relaxed line-clamp-3 transition-opacity duration-500 ${showTrailer && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`,
                        children: featuredItem.overview
                    }, void 0, false, {
                        fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center gap-4 mb-6 text-gray-300 transition-opacity duration-500 ${showTrailer && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    "⭐ ",
                                    featuredItem.vote_average.toFixed(1)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                lineNumber: 334,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: new Date(featuredItem.release_date || featuredItem.first_air_date || '').getFullYear()
                            }, void 0, false, {
                                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                lineNumber: 338,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 transition-opacity duration-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: goToPrev,
                                "aria-label": "Previous",
                                className: "px-3 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors flex items-center justify-center",
                                disabled: allItems.length <= 1,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "13,4 7,10 13,16"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                        lineNumber: 348,
                                        columnNumber: 78
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                    lineNumber: 348,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    if (showTrailer && isPlaying) {
                                        setShowTrailer(false);
                                        setIsPlaying(false);
                                    } else if (trailer) {
                                        setShowTrailer(true);
                                        setIsPlaying(true);
                                    }
                                },
                                disabled: !trailer,
                                className: "px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2",
                                children: [
                                    showTrailer && isPlaying ? // Pause icon
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "currentColor",
                                        viewBox: "0 0 20 20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "4.5",
                                                y: "4",
                                                width: "3",
                                                height: "12",
                                                rx: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                                lineNumber: 366,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "12.5",
                                                y: "4",
                                                width: "3",
                                                height: "12",
                                                rx: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                                lineNumber: 367,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                        lineNumber: 365,
                                        columnNumber: 15
                                    }, this) : // Play icon
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "currentColor",
                                        viewBox: "0 0 20 20",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                            points: "6,4 16,10 6,16"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                            lineNumber: 372,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                        lineNumber: 371,
                                        columnNumber: 15
                                    }, this),
                                    showTrailer && isPlaying ? 'Pause' : 'Play'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `/title/$
              {featuredItem.kind === 'movie' ? 'movies'
              : featuredItem.kind === 'tv' ? 'shows'
              : featuredItem.kind === 'anime' ? 'animes'
              : featuredItem.kind === 'cartoon' ? 'cartoons'
              : featuredItem.kind === 'kdrama' ? 'shows' // treat kdrama as shows
              : featuredItem.kind === 'international' ? 'movies' // treat international as movies
              : 'movies'
            }/${featuredItem.id}`,
                                className: "px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg transition-colors flex items-center justify-center",
                                children: "More Info"
                            }, void 0, false, {
                                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/media/FeaturedBanner.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/media/FeaturedBanner.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, this);
}
_s(FeaturedBanner, "Mg6maMzfikvqaiEDaldN4EvyUp4=");
_c = FeaturedBanner;
var _c;
__turbopack_context__.k.register(_c, "FeaturedBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/home/components/HomeCharts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeCards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
function HomeCards({ title, movies = [], shows = [], onShowMore, isLoading = false }) {
    _s();
    const items = [
        ...movies.map((m)=>({
                id: m.id,
                title: m.title,
                overview: m.overview,
                backdrop_path: m.backdrop_path,
                poster_path: m.poster_path,
                vote_average: m.vote_average,
                genre_ids: m.genre_ids,
                release_date: m.release_date
            })),
        ...shows.map((s)=>({
                id: s.id,
                title: s.name,
                overview: s.overview,
                backdrop_path: s.backdrop_path,
                poster_path: s.poster_path,
                vote_average: s.vote_average,
                genre_ids: s.genre_ids,
                first_air_date: s.first_air_date
            }))
    ];
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
        "HomeCards.useEffect": ()=>{
            checkScroll();
            const scrollContainer = scrollContainerRef.current;
            if (scrollContainer) {
                scrollContainer.addEventListener('scroll', checkScroll);
                return ({
                    "HomeCards.useEffect": ()=>scrollContainer.removeEventListener('scroll', checkScroll)
                })["HomeCards.useEffect"];
            }
        }
    }["HomeCards.useEffect"], []);
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
            const itemWidth = 206; // 190px width + 16px gap
            const itemsToScroll = Math.floor(containerWidth / itemWidth);
            const scrollAmount = itemsToScroll * itemWidth;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-12 px-11",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: scrollLeft,
                                disabled: !canScrollLeft,
                                className: `p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''}`,
                                "aria-label": "Scroll left",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 19l-7-7 7-7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            canScrollRight ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: scrollRight,
                                disabled: !canScrollRight,
                                className: `p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : ''}`,
                                "aria-label": "Scroll right",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 5l7 7-7 7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                        lineNumber: 121,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this) : onShowMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onShowMore,
                                disabled: isLoading,
                                className: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold",
                                children: isLoading ? 'Loading...' : 'Show More'
                            }, void 0, false, {
                                fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollContainerRef,
                className: "flex gap-1 sm:gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory md:gap-4 md:pb-6",
                children: items.map((item)=>{
                    const isMovie = 'release_date' in item;
                    const titleType = isMovie ? 'movies' : 'shows';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTitleUrl"])(titleType, item.id),
                        className: "flex-shrink-0 w-[140px] sm:w-[160px] md:w-[190px] cursor-pointer group transition-transform hover:scale-105 snap-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-[2/3] overflow-hidden bg-gray-800 shadow-lg",
                            children: [
                                item.poster_path ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tmdb$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(item.poster_path, 'w500'),
                                    alt: item.title || '',
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "(max-width: 640px) 140px, (max-width: 768px) 160px, 190px"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                    lineNumber: 152,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full flex items-center justify-center text-gray-300 bg-gradient-to-br from-gray-700 to-gray-900 p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-center font-semibold line-clamp-3 text-sm",
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                        lineNumber: 161,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                    lineNumber: 160,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-white font-semibold text-sm mb-1 line-clamp-2",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                            lineNumber: 168,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-xs text-gray-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "⭐ ",
                                                        item.vote_average.toFixed(1)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: new Date(item.release_date || item.first_air_date || '').getFullYear()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                            lineNumber: 171,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                                    lineNumber: 167,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                            lineNumber: 150,
                            columnNumber: 15
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/features/home/components/HomeCharts.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/home/components/HomeCharts.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_s(HomeCards, "Sp7lZ+wm9Cxomje/zubieCAw9fM=");
_c = HomeCards;
var _c;
__turbopack_context__.k.register(_c, "HomeCards");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/DataSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$HomeCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/home/components/HomeCharts.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DataSection({ title, initialMovies = [], initialShows = [], type, category }) {
    _s();
    const [movies, setMovies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMovies);
    const [shows, setShows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialShows);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleShowMore = async ()=>{
        setIsLoading(true);
        try {
            const response = await fetch(`/api/v1/data?type=${type}&category=${category}&page=${page + 1}`);
            const newData = await response.json();
            if (type === 'movies') {
                setMovies((prev)=>[
                        ...prev,
                        ...newData
                    ]);
            } else {
                setShows((prev)=>[
                        ...prev,
                        ...newData
                    ]);
            }
            setPage((prev)=>prev + 1);
        } catch (error) {
            console.error('Error loading more data:', error);
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$home$2f$components$2f$HomeCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: title,
        movies: movies,
        shows: shows,
        onShowMore: handleShowMore,
        isLoading: isLoading
    }, void 0, false, {
        fileName: "[project]/src/components/sections/DataSection.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(DataSection, "b3cAcUtSckP+alIe8yW1qIOnz5g=");
_c = DataSection;
var _c;
__turbopack_context__.k.register(_c, "DataSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_fb1b3359._.js.map