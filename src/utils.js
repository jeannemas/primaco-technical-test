/**
 * @import { IncomingMessage } from 'node:http';
 */

/**
 * Accumulates the body of the incoming request.
 *
 * @param {IncomingMessage} request
 * @returns {Promise<string>}
 */
export function accumulateBodyFromRequest(request) {
  return new Promise((resolve) => {
    /**
     * @type {string[]}
     */
    let chunks = [];

    request.on('data', (chunk) => chunks.push(chunk)); // Accumulate the body chunks
    request.on('end', () => resolve(chunks.join(''))); // Resolve the promise when the request ends
  });
}

/**
 * @satisfies {Record<string, number>}
 */
export const HTTP_CODES = /** @type {const} */ ({
  OK: 200,
  CREATED: 201,

  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,

  INTERNAL_SERVER_ERROR: 500,
});
