export const movieGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];

export const tvGenres = [
  "Action & Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Kids",
  "Mystery",
  "News",
  "Reality",
  "Sci-Fi & Fantasy",
  "Soap",
  "Talk",
  "War & Politics",
  "Western",
];

export const animeGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Magic",
  "Mystery",
  "Psychological",
  "Romance",
  "School",
  "Science Fiction",
  "Shounen",
  "Shoujo",
  "Seinen",
  "Supernatural",
  "Thriller",
];

export const cartoonGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Family",
  "Fantasy",
  "Kids",
  "Mystery",
  "Science Fiction",
];

// TMDB Genre ID mappings
export const movieGenreIds: Record<string, number> = {
  "Action": 28,
  "Adventure": 12,
  "Animation": 16,
  "Comedy": 35,
  "Crime": 80,
  "Documentary": 99,
  "Drama": 18,
  "Family": 10751,
  "Fantasy": 14,
  "History": 36,
  "Horror": 27,
  "Music": 10402,
  "Mystery": 9648,
  "Romance": 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  "Thriller": 53,
  "War": 10752,
  "Western": 37,
};

export const tvGenreIds: Record<string, number> = {
  "Action & Adventure": 10759,
  "Animation": 16,
  "Comedy": 35,
  "Crime": 80,
  "Documentary": 99,
  "Drama": 18,
  "Family": 10751,
  "Kids": 10762,
  "Mystery": 9648,
  "News": 10763,
  "Reality": 10764,
  "Sci-Fi & Fantasy": 10765,
  "Soap": 10766,
  "Talk": 10767,
  "War & Politics": 10768,
  "Western": 37,
};

// Anime genres map to Animation genre in TMDB (with genre ID 16)
export const animeGenreIds: Record<string, number> = {
  "Action": 28,
  "Adventure": 12,
  "Comedy": 35,
  "Drama": 18,
  "Fantasy": 14,
  "Horror": 27,
  "Magic": 10749,
  "Mystery": 9648,
  "Psychological": 9648,
  "Romance": 10749,
  "School": 10751,
  "Science Fiction": 878,
  "Shounen": 35,
  "Shoujo": 10749,
  "Seinen": 18,
  "Supernatural": 14,
  "Thriller": 53,
};

// Cartoon genres map to Animation genre for TV shows
export const cartoonGenreIds: Record<string, number> = {
  "Action": 28,
  "Adventure": 12,
  "Comedy": 35,
  "Drama": 18,
  "Family": 10751,
  "Fantasy": 14,
  "Kids": 10762,
  "Mystery": 9648,
  "Science Fiction": 878,
};

export const movieCharts = [
  "Trending Movies",
  "Top Rated Movies",
  "Upcoming Movies",
  "Now Playing Movies",
  "Popular Movies",
  "Popular International Movies",
  "Top Rated International Movies",
  "Upcoming International Movies",
];

export const tvCharts = [
  "Trending TV Shows",
  "Top Rated TV Shows",
  "Airing Today",
  "On The Air",
  "Popular TV Shows",
  "Popular International TV Shows",
  "Top Rated International TV Shows",
  "Upcoming International TV Shows",
];

export const animeCharts = [
  "Popular Anime",
  "Top Rated Anime",
  "Airing Now",
  "Upcoming Anime",
  "All Time Classics",
  "Popular International Anime",
  "Top Rated International Anime",
  "Upcoming International Anime",
];

export const cartoonCharts = [
  "Popular Cartoons",
  "Top Rated Cartoons",
  "Kids Favorites",
  "Trending Cartoons",
  "Family Friendly",
  "Popular International Cartoons",
  "Top International Cartoons",
  "Upcoming International",
];