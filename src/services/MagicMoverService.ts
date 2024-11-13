import { injectable } from 'tsyringe';
import { Types } from 'mongoose';

import MagicMover from '../models/MagicMover';
import MagicItem from '../models/MagicItem';
import MissionLog from '../models/MissionLog';
import { IMagicMover, IMagicItem, IMissionLog } from '../shared/interfaces/modelInterfaces';
import { PaginatedResult, PaginationOptions } from '../shared/interfaces/queryOptions';

@injectable()
export class MagicMoverService {

  /**
   * Creates a new MagicMover.
   * @param {Partial<IMagicMover>} data - The data to create the MagicMover.
   * @returns {Promise<IMagicMover>} - The created MagicMover.
   */
  public async createMagicMover(data: Partial<IMagicMover>): Promise<IMagicMover> {
    return await MagicMover.create(data);
  }

  /**
   * Retrieves a MagicMover by its ID.
   * @param {string | Types.ObjectId} id - The ID of the MagicMover.
   * @returns {Promise<IMagicMover | null>} - The found MagicMover or null if not found.
   */
  public async getMagicMoverById(id: string | Types.ObjectId): Promise<IMagicMover | null> {
    return await MagicMover.findById(id);
  }

  /**
   * Retrieves all MagicMovers with optional pagination, sorting, and search.
   * @param {Record<string, any>} query - Query filter for MagicMovers.
   * @param {PaginationOptions} [options={}] - Pagination and sorting options.
   * @returns {Promise<PaginatedResult<IMagicMover>>} - The paginated result of MagicMovers.
   * @throws {Error} - Throws error if page or limit values are invalid.
   */
  public async getAllMagicMovers(
    query: Record<string, any>,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<IMagicMover>> {
    const { page = 1, limit = 10, sort = null, search = {} } = options;

    if (isNaN(page) || page <= 0 || isNaN(limit) || limit <= 0) {
      throw new Error('Invalid page or limit values');
    }

    let searchQuery: Record<string, any> = {};
    if (search && typeof search === 'object' && Object.keys(search).length > 0) {
      searchQuery = Object.keys(search).reduce((acc, key) => {
        const fieldType = MagicMover.schema.paths[key]?.instance;

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
      const sortFields = sort.split(',').map((field) => field.trim());
      sortQuery = sortFields.reduce((acc, field) => {
        const [key, order] = field.split(':');
        acc[key] = order === 'desc' ? -1 : 1;
        return acc;
      }, {} as Record<string, 1 | -1>);
    }

    const combinedQuery = { ...query, ...searchQuery };

    const results = await MagicMover.find(combinedQuery)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await MagicMover.countDocuments();
    return {
      total: count,
      page,
      limit,
      results,
    };
  }

  /**
   * Updates an existing MagicMover by its ID.
   * @param {string} id - The ID of the MagicMover to update.
   * @param {Partial<IMagicMover>} data - The updated data for the MagicMover.
   * @returns {Promise<Document | null>} - The updated MagicMover or null if not found.
   */
  public async updateMagicMover(
    id: string,
    data: Partial<IMagicMover>
  ): Promise<Document | null> {
    return await MagicMover.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Deletes a MagicMover by its ID.
   * @param {string} id - The ID of the MagicMover to delete.
   * @returns {Promise<Document | null>} - The deleted MagicMover or null if not found.
   */
  public async deleteMagicMover(id: string): Promise<Document | null> {
    return await MagicMover.findByIdAndDelete(id);
  }

  /**
   * Loads a MagicItem onto a MagicMover.
   * @param {Types.ObjectId} moverId - The ID of the MagicMover.
   * @param {Types.ObjectId} itemId - The ID of the MagicItem.
   * @returns {Promise<IMagicMover | null>} - The updated MagicMover or null if loading failed.
   * @throws {Error} - Throws error if item not found or exceeds weight limit.
   */
  public async loadMagicMover(moverId: Types.ObjectId, itemId: Types.ObjectId): Promise<any> {
    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      console.error(`Mover with ID ${moverId} not found.`);
      return null;
    }

    if (mover.currentState === 'resting') {
      mover.currentState = 'loading';
      await mover.save();
    }
    if (mover.currentState !== 'loading') {
      console.warn(`Mover with ID ${moverId} is not in the 'loading' state. Current state: ${mover.currentState}`);
      return null;
    }

    const item = await MagicItem.findById(itemId);
    if (!item) {
      console.error(`Item with ID ${itemId} not found.`);
      throw new Error('Item not found');
    }

    // Calculate the current weight and check against the weight limit
    const currentWeight = mover.items.reduce((sum, i) => sum + i.weight, 0);
    if (currentWeight + item.weight > mover.weightLimit) {
      throw new Error('Exceeds weight limit');
    }

    // Add the item to mover's items array
    mover.items.push({ item: item._id as unknown as Types.ObjectId, weight: item.weight });
    await mover.save();

    // Log the loading activity
    await new MissionLog({ mover: mover._id, activity: 'loading' }).save();

    return mover;
  }

  /**
   * Starts a mission for a MagicMover.
   * @param {Types.ObjectId} moverId - The ID of the MagicMover.
   * @returns {Promise<IMagicMover | null>} - The updated MagicMover or null if mission start failed.
   */
  public async startMission(moverId: Types.ObjectId): Promise<IMagicMover | null> {
    const mover = await MagicMover.findById(moverId);

    if (!mover || mover.currentState !== 'loading') return null;

    mover.currentState = 'on-mission';
    mover.missionCount += 1;
    await mover.save();

    await new MissionLog({ mover: mover._id, activity: 'on-mission' }).save();
    return mover;
  }

  /**
   * Ends a mission for a MagicMover.
   * @param {Types.ObjectId} moverId - The ID of the MagicMover.
   * @returns {Promise<IMagicMover | null>} - The updated MagicMover or null if mission end failed.
   */
  public async endMission(moverId: Types.ObjectId): Promise<IMagicMover | null> {
    const mover = await MagicMover.findById(moverId);
    if (!mover || mover.currentState !== 'on-mission') return null;

    mover.currentState = 'resting';
    mover.items = [];
    await mover.save();

    await new MissionLog({ mover: mover._id, activity: 'resting' }).save();
    return mover;
  }

  public async getTopMovers(): Promise<any> {
    return await MagicMover.find().sort({ missionCount: -1 }); // Sort by missionCount in descending order
  }
}

export default MagicMoverService;
