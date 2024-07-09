require('dotenv').config();
const { createServer } = require('http');
const { parse } = require('url');
const querystring = require('querystring');
const next = require('next');
const users_api_handler = require('./apis/users'); // Ensure the correct path

// Check if environment variables are defined
const port = process.env.APP_PORT;
const hostname = process.env.APP_BASE_URL;

if (!port || !hostname) {
  console.error('Error: APP_BASE_URL and APP_PORT must be defined in the environment.');
  process.exit(1); // Abort the application
}

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url || '', true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/api/users') {
      req.query = querystring.parse(query);
      users_api_handler(req, res);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${hostname}:${port}`);
  });
});