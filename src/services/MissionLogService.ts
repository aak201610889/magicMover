import MissionLog from '../models/MissionLog';
import { IMissionLog } from '../shared/interfaces/modelInterfaces';
import { Document, Types } from 'mongoose';


/**
 * Creates a new MissionLog.
 * @param {Partial<IMissionLog>} data - The data to create the MissionLog.
 * @returns {Promise<IMissionLog>} - The created MissionLog.
 */
export const createMissionLog = async (data: Partial<IMissionLog>): Promise<IMissionLog> => {
  return await MissionLog.create(data);
};
/**
 * Retrieves a MissionLog by its ID.
 * @param {string | Types.ObjectId} id - The ID of the MissionLog.
 * @returns {Promise<IMissionLog | null>} - The found MissionLog or null if not found.
 */
export const getMissionLogById = async (id: string | Types.ObjectId): Promise<IMissionLog | null> => {
  return await MissionLog.findById(id);
};
/**
 * Retrieves all MissionLogs.
 * @returns {Promise<IMissionLog[]>} - The list of MissionLogs.
 */
export const getAllMissionLogs = async (): Promise<any> => {

  const results = await MissionLog.find()
 return results;

};
/**
 * Updates an existing MissionLog by its ID.
 * @param {string | Types.ObjectId} id - The ID of the MissionLog to update.
 * @param {Partial<IMissionLog>} data - The updated data for the MissionLog.
 * @returns {Promise<IMissionLog | null>} - The updated MissionLog or null if not found.
 */
export const updateMissionLog = async (
  id: string | Types.ObjectId,
  data: Partial<IMissionLog>
): Promise<IMissionLog | null> => {
  return await MissionLog.findByIdAndUpdate(id, data, { new: true });
};
/**
 * Deletes a MissionLog by its ID.
 * @param {string | Types.ObjectId} id - The ID of the MissionLog to delete.
 * @returns {Promise<IMissionLog | null>} - The deleted MissionLog or null if not found.
 */
export const deleteMissionLog = async (id: string | Types.ObjectId): Promise<IMissionLog | null> => {
  return await MissionLog.findByIdAndDelete(id);
};
