import { Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { MagicItemService } from '../services/MagicItemService';

import { validateMagicItem } from '../validators/MagicItemValidator';
import { PaginationOptions } from '../shared/interfaces/queryOptions';
/**
 * CRUD MagicItem controller.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
@injectable() 
export class MagicItemController {
  constructor(
    @inject(MagicItemService) private magicItemService: MagicItemService // Inject the service
  ) {}

  public createMagicItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = validateMagicItem(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const magicitem = await this.magicItemService.createMagicItem(req.body);
      res.status(201).json(magicitem);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public getMagicItemById = async (req: Request, res: Response): Promise<void> => {
    try {
      const magicitem = await this.magicItemService.getMagicItemById(req.params.id);
      if (!magicitem) {
        res.status(404).json({ error: 'MagicItem not found' });
        return;
      }
      res.status(200).json(magicitem);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public getAllMagicItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const options: PaginationOptions = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sort: req.query.sort ? (req.query.sort as string) : undefined,
        search: req.query.search ? JSON.parse(req.query.search as string) : undefined,
      };

      const magicitems = await this.magicItemService.getAllMagicItems(req.query, options);
      res.status(200).json(magicitems);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public updateMagicItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = validateMagicItem(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const updatedMagicItem = await this.magicItemService.updateMagicItem(req.params.id, req.body);
      if (!updatedMagicItem) {
        res.status(404).json({ error: 'MagicItem not found' });
        return;
      }
      res.status(200).json(updatedMagicItem);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public deleteMagicItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.magicItemService.deleteMagicItem(req.params.id);
      if (!result) {
        res.status(404).json({ error: 'MagicItem not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}
