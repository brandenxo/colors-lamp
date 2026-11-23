const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '../public/js/code.js'), 'utf8');
const colorPage = fs.readFileSync(path.join(__dirname, '../public/color.html'), 'utf8');
let app;
let xhr;

beforeEach(() => {
  document.body.innerHTML = new DOMParser().parseFromString(colorPage, 'text/html').body.innerHTML;
  document.cookie = 'firstName=Test,lastName=User,userId=1';
  xhr = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    send: jest.fn()
  };
  jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhr);
  app = new Function(`${source}\nreturn { addColor, searchColor, readCookie };`)();
  app.readCookie();
});

afterEach(() => {
  jest.restoreAllMocks();
});

function respond(body, status = 200) {
  xhr.readyState = 4;
  xhr.status = status;
  xhr.responseText = JSON.stringify(body);
  xhr.onreadystatechange();
}

test('addColor sends the entered color and logged-in user as JSON', () => {
  document.getElementById('colorText').value = 'Royal Blue';
  app.addColor();

  expect(xhr.open).toHaveBeenCalledWith('POST', expect.stringMatching(/\/AddColor\.php$/), true);
  expect(xhr.setRequestHeader).toHaveBeenCalledWith('Content-type', 'application/json; charset=UTF-8');
  expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({ color: 'Royal Blue', userId: 1 });
});

test('addColor displays confirmation after a successful response', () => {
  app.addColor();
  respond({ error: '' });

  expect(document.getElementById('colorAddResult').textContent).toBe('Color has been added');
});

test('addColor does not display success for a failed HTTP response', () => {
  app.addColor();
  respond({ error: 'Server error' }, 500);

  expect(document.getElementById('colorAddResult').textContent).toBe('');
});

test('addColor displays a request error', () => {
  xhr.send.mockImplementation(() => { throw new Error('Connection failed'); });
  app.addColor();

  expect(document.getElementById('colorAddResult').textContent).toBe('Connection failed');
});

test('searchColor sends the search term and formats results on separate lines', () => {
  document.getElementById('searchText').value = 'Blue';
  app.searchColor();
  respond({ results: ['Blue', 'Royal Blue'], error: '' });

  expect(xhr.open).toHaveBeenCalledWith('POST', expect.stringMatching(/\/SearchColors\.php$/), true);
  expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({ search: 'Blue', userId: 1 });
  const list = document.getElementById('colorList');
  expect(list.textContent).toContain('Blue');
  expect(list.textContent).toContain('Royal Blue');
  expect(list.querySelectorAll('br')).toHaveLength(1);
});

test('searchColor formats one result without a trailing line break', () => {
  app.searchColor();
  respond({ results: ['Red'], error: '' });

  expect(document.getElementById('colorList').innerHTML).toBe('Red');
});
