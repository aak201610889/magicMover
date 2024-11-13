// magicitemRoutes.ts
import express, { Request, Response, Router } from 'express';
import { MagicItemController } from '../controllers/MagicItemController';

import { container } from 'tsyringe';
import { MagicItemService } from 'services/MagicItemService';
const router: Router = express.Router();

const magicItemController = container.resolve(MagicItemController);
/**
 * @swagger
 * /magic-item:
 *   post:
 *     summary: Create a new magic item
 *     description: Adds a new magic item to the collection
 *     tags: [Magic Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               weight:
 *                 type: number
 *     responses:
 *       201:
 *         description: Magic item created successfully
 *       400:
 *         description: Invalid data provided
 */
router.post('/', (req: Request, res: Response) => magicItemController.createMagicItem(req, res));

/**
 * @swagger
 * /magic-item/{id}:
 *   get:
 *     summary: Get a magic item by its ID
 *     tags: [Magic Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The magic item's ID
 *     responses:
 *       200:
 *         description: Magic item found
 *       404:
 *         description: Magic item not found
 */
router.get('/:id', (req: Request, res: Response) => magicItemController.getMagicItemById(req, res));

/**
 * @swagger
 * /magic-item:
 *   get:
 *     summary: Get all magic items
 *     tags: [Magic Item]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of magic items
 *       400:
 *         description: Invalid query parameters
 */
router.get('/', (req: Request, res: Response) => magicItemController.getAllMagicItems(req, res));

/**
 * @swagger
 * /magic-item/{id}:
 *   put:
 *     summary: Update an existing magic item
 *     tags: [Magic Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The magic item's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               weight:
 *                 type: number
 *     responses:
 *       200:
 *         description: Magic item updated successfully
 *       400:
 *         description: Invalid data provided
 *       404:
 *         description: Magic item not found
 */
router.put('/:id', (req: Request, res: Response) => magicItemController.updateMagicItem(req, res));

/**
 * @swagger
 * /magic-item/{id}:
 *   delete:
 *     summary: Delete a magic item by its ID
 *     tags: [Magic Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The magic item's ID
 *     responses:
 *       204:
 *         description: Magic item deleted successfully
 *       404:
 *         description: Magic item not found
 */
router.delete('/:id', (req: Request, res: Response) => magicItemController.deleteMagicItem(req, res));

export default router;
