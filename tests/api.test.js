const baseUrl = process.env.TEST_API_URL;

beforeAll(() => {
  if (!baseUrl) {
    throw new Error('Set TEST_API_URL to the PHP test server, e.g. http://127.0.0.1:8080/api');
  }
});

async function post(endpoint, payload) {
  const response = await fetch(`${baseUrl}/${endpoint}.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(5000)
  });
  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toMatch(/application\/json/);
  return response.json();
}

test('Login returns the expected user JSON for valid credentials', async () => {
  const result = await post('Login', { login: 'testuser', password: 'testpass' });
  expect(result).toEqual({ id: 1, firstName: 'Test', lastName: 'User', error: '' });
});

test('Login rejects an incorrect password', async () => {
  const result = await post('Login', { login: 'testuser', password: 'wrong' });
  expect(result).toEqual({ id: 0, firstName: '', lastName: '', error: 'No Records Found' });
});

test('SearchColors returns matching colors in a results array', async () => {
  const result = await post('SearchColors', { search: 'Blue', userId: 1 });
  expect(result).toEqual({ results: ['Royal Blue'], error: '' });
});

test('SearchColors returns an error when no colors match', async () => {
  const result = await post('SearchColors', { search: 'Nonexistent Color', userId: 1 });
  expect(result.error).toBe('No Records Found');
});

test('SearchColors does not return another user\'s colors', async () => {
  const result = await post('SearchColors', { search: 'Private Green', userId: 1 });
  expect(result.error).toBe('No Records Found');

  const ownerResult = await post('SearchColors', { search: 'Private Green', userId: 2 });
  expect(ownerResult).toEqual({ results: ['Private Green'], error: '' });
});

test('AddColor saves a color that can be retrieved through SearchColors', async () => {
  const color = `Test Violet ${crypto.randomUUID()}`;
  const added = await post('AddColor', { color, userId: 1 });
  expect(added).toEqual({ error: '' });

  const found = await post('SearchColors', { search: color, userId: 1 });
  expect(found).toEqual({ results: [color], error: '' });
});
