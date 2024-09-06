import { createFact, readAllFacts } from './services/database.js';
import { accumulateBodyFromRequest, HTTP_CODES } from './utils.js';

/**
 * @import { Fact } from './models/types.js'
 * @import { Route } from './types.js'
 */

/**
 * @type {Map<string, Route>}
 */
const routes = new Map([
  [
    '/api/facts',
    {
      async handle(request, response) {
        const { method = 'GET' } = request;

        if (method === 'GET') {
          // API endpoint to fetch all the facts
          const allFacts = await readAllFacts();

          response.statusCode = HTTP_CODES.OK;

          response.setHeader('Content-Type', 'application/json');
          response.write(JSON.stringify(allFacts));
        } else if (method === 'POST') {
          // API endpoint to create a new fact and save it to the database
          const body = await accumulateBodyFromRequest(request);
          // We don't do any validation here, so this might break if malformed JSON is sent
          /**
           * @type {Fact}
           */
          const fact = JSON.parse(body);

          try {
            const id = await createFact(fact);

            response.statusCode = HTTP_CODES.CREATED;

            response.setHeader('Content-Type', 'application/json');
            response.write(JSON.stringify({ id }));
          } catch (error) {
            response.statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
          }
        } else {
          response.statusCode = HTTP_CODES.METHOD_NOT_ALLOWED;
        }

        response.end();
      },
    },
  ],
]);

/**
 * Matches a route from the pathname.
 *
 * @param {string} pathname
 * @returns {Route | null}
 */
export function matchRouteFromPathname(pathname) {
  if (routes.has(pathname)) {
    const route = /** @type {Route} */ (routes.get(pathname));

    return route;
  }

  return null;
}
