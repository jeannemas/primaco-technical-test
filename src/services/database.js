import { exit } from 'node:process';
import sqlite3 from 'sqlite3';

import { readAll } from './facts.js';

/**
 * @import { Fact } from '../models/types.js';
 */

const db = new sqlite3.Database(':memory:'); // In-memory SQLite database

await createFactsTable().catch((error) => {
  console.error('Failed to create the facts table:', error);

  exit(1);
});
await populateFactsTable().catch((error) => {
  console.error('Failed to populate the facts table:', error);

  exit(1);
});

/**
 * Creates the facts table.
 *
 * @returns {Promise<void>}
 */
function createFactsTable() {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE facts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT
      )`,
      [],
      (error) => {
        if (error) {
          reject(error);

          return;
        }

        resolve();
      }
    );
  });
}

/**
 * Creates the facts table.
 *
 * @returns {Promise<void>}
 */
function populateFactsTable() {
  return new Promise(async (resolve, reject) => {
    const facts = await readAll();

    const statement = db.prepare(`INSERT INTO facts (text) VALUES (?)`);

    for (const fact of facts) {
      statement.run(fact.text, (error) => {
        if (error) {
          reject(error);

          return;
        }
      });
    }

    statement.finalize((error) => {
      if (error) {
        reject(error);

        return;
      }

      resolve();
    });
  });
}

/**
 * Reads all the facts.
 *
 * @returns {Promise<Fact[]>}
 */
export function readAllFacts() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT id, text FROM facts`, [], (error, rows) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(rows);
    });
  });
}

/**
 * Create a fact.
 *
 * @param {Fact} fact
 * @returns {Promise<Fact['id']>}
 */
export function createFact(fact) {
  return new Promise((resolve, reject) => {
    db.get(`INSERT INTO facts (text) VALUES (?) RETURNING id`, [fact.text], (error, row) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(row.id);
    });
  });
}
