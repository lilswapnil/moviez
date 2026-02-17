// Input validation utilities

/**
 * Validate search query
 */
export function isValidSearchQuery(query: string): boolean {
  return typeof query === 'string' && query.trim().length > 0;
}

/**
 * Validate pagination page number
 */
export function isValidPageNumber(page: number): boolean {
  return Number.isFinite(page) && page > 0;
}

/**
 * Validate media ID
 */
export function isValidMediaId(id: number | string): boolean {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  return Number.isFinite(numId) && numId > 0;
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
