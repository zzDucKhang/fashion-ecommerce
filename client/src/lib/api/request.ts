// src/lib/api/request.ts

<<<<<<< HEAD
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:5000/api";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
}

export class ApiError extends Error {
  public status: number;
  public data: any;
=======
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
>>>>>>> 8fb81fb80e0d77b1e30fcd25830eabb6d2e6c87e

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Universal native fetch wrapper for Enterprise API requests.
 * Automatically injects Bearer token from localStorage and purges it on 401 Unauthorized.
 */
export async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers, ...restOptions } = options;

  // 1. Build Full URL
  let fullUrl: string;
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    fullUrl = endpoint;
  } else {
    const base = API_BASE_URL.replace(/\/+$/, "");
    const path = endpoint.replace(/^\/+/, "");
    fullUrl = `${base}/${path}`;
  }

  // Append query params if provided
  if (params) {
    const urlObj = new URL(fullUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });
    fullUrl = urlObj.toString();
  }

  // 2. Build Headers & Inject Token
  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has("Content-Type") && !(restOptions.body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (token && !requestHeaders.has("Authorization")) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  // 3. Execute Fetch Request
  let response: Response;
  try {
    response = await fetch(fullUrl, {
      ...restOptions,
      headers: requestHeaders,
    });
  } catch (networkError: unknown) {
    const message =
      networkError instanceof Error ? networkError.message : "Network error occurred";
    throw new ApiError(message, 0);
  }

  // 4. Handle 401 Unauthorized token revocation
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
  }

  // 5. Parse Response Data
  let data: any = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await response.text();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const errorMsg =
      (data && typeof data === "object" && (data.message || data.error)) ||
      `API request failed with status ${response.status}`;
    throw new ApiError(errorMsg, response.status, data);
  }

  return data as T;
}

export const api = {
<<<<<<< HEAD
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: "GET" });
=======
  get<T>(path: string, options?: RequestInit) {
    return request<T>(path, {
      ...options,
      method: 'GET',
    });
>>>>>>> 8fb81fb80e0d77b1e30fcd25830eabb6d2e6c87e
  },

  post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
<<<<<<< HEAD
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
=======
      method: 'POST',
      body: JSON.stringify(body),
>>>>>>> 8fb81fb80e0d77b1e30fcd25830eabb6d2e6c87e
    });
  },

  put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
<<<<<<< HEAD
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
=======
      method: 'PUT',
      body: JSON.stringify(body),
>>>>>>> 8fb81fb80e0d77b1e30fcd25830eabb6d2e6c87e
    });
  },

  patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
<<<<<<< HEAD
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
=======
      method: 'DELETE',
>>>>>>> 8fb81fb80e0d77b1e30fcd25830eabb6d2e6c87e
    });
  },

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: "DELETE" });
  },
};
