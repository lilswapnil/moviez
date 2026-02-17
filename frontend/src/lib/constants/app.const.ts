// App-wide constants
export const APP_NAME = 'Moviez';
export const APP_DESCRIPTION = 'A movie discovery app built with Next.js 13 and The Movie Database (TMDb) API';

export const ROUTES = {
  HOME: '/',
  LIBRARY: '/browse/library',
  SEARCH: '/browse/search',
  ACCOUNT: '/auth/account',
  GENRES: '/browse/genres',
  TITLE: '/title',
} as const;
