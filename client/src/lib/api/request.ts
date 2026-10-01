const API_URL = process.env.BACKEND_URL;

if (!API_URL) {
  throw new Error('BACKEND_URL is not defined');
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get<T>(path: string, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'GET',
    });
  },

  post<T>(path: string, body?: unknown, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put<T>(path: string, body?: unknown, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete<T>(path: string, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'DELETE',
    });
  },
};
