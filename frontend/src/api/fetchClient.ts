const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined'
    ? window.location.origin
    : 'https://project-learner.onrender.com');


interface FetchOptions extends RequestInit {
  timeout?: number;
}

class FetchClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL: string, timeout = 10000) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
  }

  private async request(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<unknown> {
    const url = `${this.baseURL}${endpoint}`;
    const timeout = options.timeout ?? this.defaultTimeout;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include',
      mode: 'cors',
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        // Special‑case 401 if needed (token expired, etc.)
        if (response.status === 401) {
          // Backend handles clearing cookies / sessions
        }
        // Try to parse error payload as { message?: string }
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const payload = (await response.json()) as { message?: string };
          if (payload.message) errorMessage = payload.message;
        } catch {
          /* ignore JSON parse errors */
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      if (err instanceof TypeError) {
        console.error('Network error:', err.message);
        throw new Error('Network error - please check your connection');
      }
      if (err instanceof Error) {
        throw err;
      }
      // Fallback for truly unknown errors
      throw new Error('An unknown error occurred');
    }
  }

  get(endpoint: string, options: FetchOptions = {}): Promise<unknown> {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint: string, data?: unknown, options: FetchOptions = {}): Promise<unknown> {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  }

  put(endpoint: string, data?: unknown, options: FetchOptions = {}): Promise<unknown> {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  }

  delete(endpoint: string, options: FetchOptions = {}): Promise<unknown> {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  patch(endpoint: string, data?: unknown, options: FetchOptions = {}): Promise<unknown> {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  }
}

const fetchClient = new FetchClient(baseURL);

export default fetchClient;
