/**
 * Fetch with retry and timeout for reliable API calls on Vercel/serverless.
 * Handles intermittent failures and slow backends.
 */
import { getApiBase } from '@/lib/constants/api.const';

const DEFAULT_TIMEOUT_MS = 20000; // 20s for slow backends
const MAX_RETRIES = 2;

export interface FetchApiOptions extends RequestInit {
  /** Request timeout in ms. Default 20000. */
  timeout?: number;
  /** Max retry attempts on failure. Default 2. */
  retries?: number;
}

export async function fetchApi(
  path: string,
  options?: FetchApiOptions
): Promise<Response> {
  const base = getApiBase();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  const { timeout = DEFAULT_TIMEOUT_MS, retries = MAX_RETRIES, ...fetchOptions } = options ?? {};
  const timeoutMs = timeout;
  const maxRetries = retries;

  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const onAbort = () => controller.abort();
    if (options?.signal) {
      options.signal.addEventListener('abort', onAbort);
    }

    try {
      const init: RequestInit = {
        ...fetchOptions,
        signal: controller.signal,
      };
      if (typeof window === 'undefined') {
        (init as RequestInit & { next?: { revalidate: number } }).next = {
          revalidate: 3600,
        };
      }
      const res = await fetch(url, init);
      clearTimeout(timeoutId);
      options?.signal?.removeEventListener('abort', onAbort);

      // Retry on 5xx or network failure
      if (!res.ok && res.status >= 500 && attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
        continue;
      }
      return res;
    } catch (e) {
      clearTimeout(timeoutId);
      options?.signal?.removeEventListener('abort', onAbort);
      lastError = e;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
      } else {
        throw e;
      }
    }
  }
  throw lastError;
}
