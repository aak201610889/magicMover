// src/services/MagicItemService.ts
import MagicItem from '../models/MagicItem';
import { IMagicItem } from '../shared/interfaces/modelInterfaces';
import { Types } from 'mongoose';
import { PaginatedResult, PaginationOptions } from '../shared/interfaces/queryOptions';
import { injectable } from 'tsyringe';

@injectable()
export class MagicItemService {
  /**
   * Creates a new MagicItem.
   * @param {Partial<IMagicItem>} data - The data to create the MagicItem.
   * @returns {Promise<IMagicItem>} - The created MagicItem.
   */
  async createMagicItem(data: Partial<IMagicItem>): Promise<IMagicItem> {
    return await MagicItem.create(data);
  }

  /**
   * Retrieves a MagicItem by its ID.
   * @param {string | Types.ObjectId} id - The ID of the MagicItem.
   * @returns {Promise<IMagicItem | null>} - The found MagicItem or null if not found.
   */
  async getMagicItemById(id: string | Types.ObjectId): Promise<IMagicItem | null> {
    return await MagicItem.findById(id);
  }

  /**
   * Retrieves all MagicItems with optional pagination, sorting, and search.
   * @param {Record<string, any>} [query={}] - Query filter for MagicItems.
   * @param {PaginationOptions} [options={}] - Pagination and sorting options.
   * @returns {Promise<PaginatedResult<IMagicItem>>} - The paginated result of MagicItems.
   * @throws {Error} - Throws error if page or limit values are invalid.
   */
  async getAllMagicItems(
    query: Record<string, any> = {},
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<IMagicItem>> {
    const { page = 1, limit = 10, sort = null, search = {} } = options;

    if (isNaN(page) || page <= 0 || isNaN(limit) || limit <= 0) {
      throw new Error('Invalid page or limit values');
    }

    let searchQuery: Record<string, any> = {};
    if (search && typeof search === 'object' && Object.keys(search).length > 0) {
      searchQuery = Object.keys(search).reduce((acc, key) => {
        const fieldType = MagicItem.schema.paths[key]?.instance;

        if (fieldType === 'String') {
          acc[key] = { $regex: search[key], $options: 'i' };
        } else {
          acc[key] = search[key];
        }

        return acc;
      }, {} as Record<string, any>);
    }

    let sortQuery: Record<string, 1 | -1> = {};
    if (sort) {
      const sortFields = sort.split(',').map(field => field.trim());
      sortQuery = sortFields.reduce((acc, field) => {
        const [key, order] = field.split(':');
        acc[key] = order === 'desc' ? -1 : 1;
        return acc;
      }, {} as Record<string, 1 | -1>);
    }

    const combinedQuery = { ...query, ...searchQuery };

    const results = await MagicItem.find(combinedQuery)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await MagicItem.countDocuments(combinedQuery);
    return {
      total: count,
      page,
      limit,
      results
    };
  }

  /**
   * Updates an existing MagicItem by its ID.
   * @param {string | Types.ObjectId} id - The ID of the MagicItem to update.
   * @param {Partial<IMagicItem>} data - The updated data for the MagicItem.
   * @returns {Promise<IMagicItem | null>} - The updated MagicItem or null if not found.
   */
  async updateMagicItem(
    id: string | Types.ObjectId,
    data: Partial<IMagicItem>
  ): Promise<IMagicItem | null> {
    return await MagicItem.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Deletes a MagicItem by its ID.
   * @param {string | Types.ObjectId} id - The ID of the MagicItem to delete.
   * @returns {Promise<IMagicItem | null>} - The deleted MagicItem or null if not found.
   */
  async deleteMagicItem(id: string | Types.ObjectId): Promise<IMagicItem | null> {
    return await MagicItem.findByIdAndDelete(id);
  }
}
