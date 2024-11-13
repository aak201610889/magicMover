import { Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { Types } from 'mongoose';
import { MagicMoverService } from '../services/MagicMoverService';  // Ensure this is a class

import { validateMagicMover } from '../validators/MagicMoverValidator';
import { PaginationOptions } from '../shared/interfaces/queryOptions';

/**
 * CRUD MagicMover controller.
*  @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */

@injectable()
export class MagicMoverController {

  constructor(
    @inject(MagicMoverService) private magicMoverService: MagicMoverService
  ) { }

  // Create a MagicMover
  public createMagicMover = async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request data
      const { error } = validateMagicMover(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const magicMover = await this.magicMoverService.createMagicMover(req.body);
      res.status(201).json(magicMover);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
    }
  };

  // Get MagicMover by ID
  public getMagicMoverById = async (req: Request, res: Response): Promise<void> => {
    try {
      const magicMover = await this.magicMoverService.getMagicMoverById(req.params.id);
      if (!magicMover) {
        res.status(404).json({ error: 'MagicMover not found' });
        return;
      }
      res.status(200).json(magicMover);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
    }
  };

  // Get all MagicMovers with pagination and optional filters
  public getAllMagicMovers = async (req: Request, res: Response): Promise<void> => {
    try {
      const options: PaginationOptions = {
        page: parseInt(req.query.page as string, 10) || 1,
        limit: parseInt(req.query.limit as string, 10) || 10,
        sort: req.query.sort ? (req.query.sort as string) : undefined,
        search: req.query.search ? JSON.parse(req.query.search as string) : undefined,
      };

      const magicMovers = await this.magicMoverService.getAllMagicMovers(req.query, options);
      res.status(200).json(magicMovers);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
    }
  };

  // Update MagicMover by ID
  public updateMagicMover = async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request data
      const { error } = validateMagicMover(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const updatedMagicMover = await this.magicMoverService.updateMagicMover(req.params.id, req.body);
      if (!updatedMagicMover) {
        res.status(404).json({ error: 'MagicMover not found' });
        return;
      }
      res.status(200).json(updatedMagicMover);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
    }
  };

  // Delete MagicMover by ID
  public deleteMagicMover = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.magicMoverService.deleteMagicMover(req.params.id);
      if (!result) {
        res.status(404).json({ error: 'MagicMover not found' });
        return;
      }
      res.status(204).send();
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
    }
  };

  // Load a mover by ID and item ID
  public loadMover = async (req: Request, res: Response): Promise<void> => {
    try {
      const moverId = new Types.ObjectId(req.params.id);
      const { itemId } = req.body;
      const mover = await this.magicMoverService.loadMagicMover(moverId, itemId);
      if (!mover) {
        res.status(400).send('Mover not in loading state or item not found.');
        return;
      }
      res.json(mover);
    } catch (error: unknown) {
      res.status(500).send((error as Error).message || 'Internal Server Error');
    }
  };

  // Start a mover mission by ID
  public startMoverMission = async (req: Request, res: Response): Promise<void> => {
    try {
      const moverId = new Types.ObjectId(req.params.id);
      const mover = await this.magicMoverService.startMission(moverId);
      if (!mover) {
        res.status(400).send('Mover not in loading state');
        return;
      }
      res.json(mover);
    } catch (error: unknown) {
      res.status(500).send((error as Error).message || 'Internal Server Error');
    }
  };

  // End a mover mission by ID
  public endMoverMission = async (req: Request, res: Response): Promise<void> => {
    try {
      const moverId = new Types.ObjectId(req.params.id);
      const mover = await this.magicMoverService.endMission(moverId);
      if (!mover) {
        res.status(400).send('Mover not on a mission');
        return;
      }
      res.json(mover);
    } catch (error: unknown) {
      res.status(500).send((error as Error).message || 'Internal Server Error');
    }
  };

  // List top movers
  public listTopMovers = async (req: Request, res: Response): Promise<void> => {
    try {
      const topMovers = await this.magicMoverService.getTopMovers();
      res.status(200).json(topMovers);
    } catch (error: unknown) {
      res.status(500).send((error as Error).message || 'Internal Server Error');
    }
  };
}
