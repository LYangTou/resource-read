export interface RequestClientOptions {
  baseUrl?: string;
  headers?: HeadersInit;
  fetcher?: typeof fetch;
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: BodyInit | object | null;
}

export class RequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response: Response,
  ) {
    super(message);
    this.name = 'RequestError';
  }
}

export function createRequestClient(options: RequestClientOptions = {}) {
  const fetcher = options.fetcher ?? fetch;

  async function request<T>(path: string, requestOptions: RequestOptions = {}): Promise<T> {
    const url = buildUrl(options.baseUrl, path, requestOptions.query);
    const headers = new Headers(options.headers);
    let body = requestOptions.body as BodyInit | null | undefined;

    if (body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof Blob)) {
      headers.set('Content-Type', 'application/json');
      body = JSON.stringify(body);
    }

    const response = await fetcher(url, {
      ...requestOptions,
      headers,
      body,
    });

    if (!response.ok) {
      throw new RequestError(response.statusText || 'Request failed', response.status, response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json() as Promise<T>;
    }

    return response.text() as Promise<T>;
  }

  return {
    request,
    get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'GET' }),
    post: <T>(path: string, body?: RequestOptions['body'], options?: RequestOptions) =>
      request<T>(path, { ...options, method: 'POST', body }),
  };
}

function buildUrl(baseUrl = '', path: string, query?: RequestOptions['query']) {
  const url = new URL(path, baseUrl || 'http://localhost');

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  if (!baseUrl && path.startsWith('/')) {
    return `${url.pathname}${url.search}`;
  }

  return url.toString();
}
