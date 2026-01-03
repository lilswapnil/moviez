// Image utility helpers
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  poster: 'w342',
  backdrop: 'w1280',
  profile: 'w185',
} as const;

/**
 * Generate TMDB image URL
 * @param path - Image path from TMDB API
 * @param size - Image size (poster, backdrop, profile)
 * @returns Full image URL
 */
export function getImageUrl(
  path: string | null | undefined,
  size: keyof typeof IMAGE_SIZES = 'poster'
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES[size]}${path}`;
}

/**
 * Get backdrop image URL
 */
export function getBackdropUrl(path: string | null | undefined): string | null {
  return getImageUrl(path, 'backdrop');
}

/**
 * Get poster image URL
 */
export function getPosterUrl(path: string | null | undefined): string | null {
  return getImageUrl(path, 'poster');
}

/**
 * Get profile image URL
 */
export function getProfileUrl(path: string | null | undefined): string | null {
  return getImageUrl(path, 'profile');
}
