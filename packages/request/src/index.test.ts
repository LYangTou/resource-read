import { createRequestClient, RequestError } from './index';

describe('request client', () => {
  it('serializes query and parses json', async () => {
    const fetcher = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe('https://api.example.com/users?page=1');
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    });

    const client = createRequestClient({ baseUrl: 'https://api.example.com', fetcher });

    await expect(client.get('/users', { query: { page: 1 } })).resolves.toEqual({ ok: true });
  });

  it('throws typed errors for failed responses', async () => {
    const fetcher = vi.fn(async () => new Response(null, { status: 500, statusText: 'Server Error' }));
    const client = createRequestClient({ fetcher });

    await expect(client.get('/failed')).rejects.toBeInstanceOf(RequestError);
  });
});
