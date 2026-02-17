// Date utility functions

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Get year from date string
 */
export function getYear(dateString: string): number {
  try {
    return new Date(dateString).getFullYear();
  } catch {
    return 0;
  }
}

/**
 * Check if date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  try {
    return new Date(dateString) > new Date();
  } catch {
    return false;
  }
}

/**
 * Check if date is in the past
 */
export function isPastDate(dateString: string): boolean {
  try {
    return new Date(dateString) < new Date();
  } catch {
    return false;
  }
}
