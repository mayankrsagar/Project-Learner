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
    const timeout = options.timeout || this.defaultTimeout;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Authentication is handled via HTTP-only cookies
    // No need to manually add Authorization header

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
        // Handle 401 unauthorized specifically  
        if (response.status === 401) {
          // Token is in HTTP-only cookie, can't be removed from frontend
          // Backend will handle token expiration
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          (errorData as any).message ||
            `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (
        error instanceof Error &&
        (error as any).name === 'AbortError'
      ) {
        throw new Error('Request timeout');
      }

      if (error instanceof TypeError) {
        console.error('Network error:', error.message);
        throw new Error('Network error - please check your connection');
      }

      throw error;
    }
  }

  async get(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<unknown> {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(
    endpoint: string,
    data?: unknown,
    options: FetchOptions = {}
  ): Promise<unknown> {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(
    endpoint: string,
    data?: unknown,
    options: FetchOptions = {}
  ): Promise<unknown> {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<unknown> {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  async patch(
    endpoint: string,
    data?: unknown,
    options: FetchOptions = {}
  ): Promise<unknown> {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

const fetchClient = new FetchClient(baseURL);

export default fetchClient;
