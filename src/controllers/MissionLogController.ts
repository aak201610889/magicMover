import { Request, Response } from 'express';

import { validateMissionLog } from '../validators/MissionLogValidator';
import * as MissionLogService from '../services/MissionLogService';  // Ensure the service is being exported as a named import
;


/**
 * CRUD mission log .
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export const createMissionLog = async (req: Request, res: Response): Promise<void> => {
  try {

  
    const missionlog = await MissionLogService.createMissionLog(req.body);
    res.status(201).json(missionlog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMissionLogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const missionlog = await MissionLogService.getMissionLogById(req.params.id);
    if (!missionlog){  res.status(404).json({ error: 'MissionLog not found' });    return;}
    res.status(200).json(missionlog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllMissionLogs = async (req: Request, res: Response): Promise<void> => {
  try {


    const missionlogs = await MissionLogService.getAllMissionLogs();
    res.status(200).json(missionlogs);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateMissionLog = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request data
    const { error } = validateMissionLog(req.body);
    if (error) { res.status(400).json({ error: error.details[0].message });return ;}

    const updatedMissionLog = await MissionLogService.updateMissionLog(req.params.id, req.body);
    if (!updatedMissionLog)  {res.status(404).json({ error: 'MissionLog not found' });return }
    res.status(200).json(updatedMissionLog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMissionLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await MissionLogService.deleteMissionLog(req.params.id);
    if (!result) { res.status(404).json({ error: 'MissionLog not found' });return;}
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
