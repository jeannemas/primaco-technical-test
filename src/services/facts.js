/**
 * @import { Fact } from '../models/types.js'
 */

const BASE_URL = new URL('https://cat-fact.herokuapp.com');

/**
 * Fetches all the facts.
 *
 * @returns {Promise<Fact[]>}
 */
export async function readAll() {
  const url = new URL('/facts', BASE_URL);
  const response = await fetch(url);
  /**
   * @type {Fact[]}
   */
  const facts = await response.json();

  return facts;
}
