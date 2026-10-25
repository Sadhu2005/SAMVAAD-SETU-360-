/** API origin for static hosting (GitHub Pages) vs same-origin Express. */
export function apiOrigin(): string {
  return import.meta.env.VITE_API_ORIGIN?.replace(/\/$/, '') ?? '';
}

export function apiV1Base(): string {
  const origin = apiOrigin();
  return origin ? `${origin}/api/v1` : '/api/v1';
}

export function apiAbsolutePath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const origin = apiOrigin();
  return origin ? `${origin}${normalized}` : normalized;
}
