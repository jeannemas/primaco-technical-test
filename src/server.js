import { readdir, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve } from 'node:path';

import { matchRouteFromPathname } from './routes.js';
import { HTTP_CODES } from './utils.js';

const staticAssetsPath = resolve(resolve(import.meta.dirname, '../static'));
const staticAssets = (await readdir(staticAssetsPath)).map((asset) => `/${asset}`);

export const server = createServer(async (request, response) => {
  const { method = 'GET', url = '/' } = request;

  const route = matchRouteFromPathname(url);

  if (route) {
    await route.handle(request, response);
  } else {
    const path = url.split('/').filter(Boolean);

    if (staticAssets.includes(url)) {
      response.statusCode = HTTP_CODES.OK;

      if (url.endsWith('.css')) {
        response.setHeader('Content-Type', 'text/css');
      } else if (url.endsWith('.html')) {
        response.setHeader('Content-Type', 'text/html');
      } else if (url.endsWith('.js')) {
        response.setHeader('Content-Type', 'text/javascript');
      }

      const asset = await readFile(resolve(staticAssetsPath, ...path), {
        encoding: 'utf-8',
      });

      response.write(asset);
    } else {
      response.statusCode = HTTP_CODES.NOT_FOUND;
    }

    response.end();
  }

  const responseCode = response.statusCode;

  console.info(`[${new Date().toISOString()}] ${method} ${url} ${responseCode}`);
});
