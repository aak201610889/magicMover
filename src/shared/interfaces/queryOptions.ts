/**
 * Interface for pagination options.
 * @interface PaginationOptions
 * @property {number} [page] - The current page number (optional).
 * @property {number} [limit] - The number of items to display per page (optional).
 * @property {string} [sort] - The field to sort the results by (optional).
 * @property {Record<string, any>} [search] - An object containing search query parameters (optional).
 */
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: string;
  search?: Record<string, any>; 
}

/**
* Interface for paginated results.
* @interface PaginatedResult
* @template T
* @property {number} total - The total number of items.
* @property {number} page - The current page number.
* @property {number} limit - The number of items per page.
* @property {T[]} results - The array of items for the current page.
*/
export interface PaginatedResult<T> {
  total: number;
  page: number;
  limit: number;
  results: T[];
}
