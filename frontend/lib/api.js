const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Wrapper around fetch that always points at the Express API and always
 * sends/receives the httpOnly auth cookie cross-origin.
 * Pass a path starting with "/api/..." e.g. apiFetch('/api/books').
 */
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return res;
}

export { API_URL };
