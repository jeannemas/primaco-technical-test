import type { IncomingMessage, ServerResponse } from 'node:http';

export type MaybePromise<T> = T | Promise<T>;

export interface Route {
  /**
   * A route handler.
   *
   * @param request
   * @param response
   */
  handle(request: IncomingMessage, response: ServerResponse): MaybePromise<void>;
}
