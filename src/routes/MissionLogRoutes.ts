import express, { Request, Response } from 'express';
import * as MissionLogController from '../controllers/MissionLogController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MissionLogs
 *   description: API for managing mission logs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MissionLog:
 *       type: object
 *       properties:
 *         mover:
 *           type: string
 *           description: The ID of the mover (referencing MagicMover)
 *           example: "60d21b4667d0d8992e610c85"
 *         activity:
 *           type: string
 *           enum: ['loading', 'on-mission', 'resting']
 *           description: The current activity of the mover
 *           example: "on-mission"
 */


/**
 * @swagger
 * /mission-log:
 *   post:
 *     summary: Create a new mission log
 *     tags: [MissionLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mover:
 *                 type: string
 *                 description: The ID of the mover (referencing MagicMover)
 *                 example: "60d21b4667d0d8992e610c85"
 *               activity:
 *                 type: string
 *                 enum: ['loading', 'on-mission', 'resting']
 *                 description: The current activity of the mover
 *                 example: "on-mission"
 *             required:
 *               - mover
 *               - activity
 *     responses:
 *       201:
 *         description: Mission log created successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/', (req: Request, res: Response) => MissionLogController.createMissionLog(req, res));

/**
 * @swagger
 * /mission-log/{id}:
 *   get:
 *     summary: Get a mission log by ID
 *     tags: [MissionLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mission log ID
 *     responses:
 *       200:
 *         description: Mission log found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissionLog'
 *       404:
 *         description: Mission log not found
 */
router.get('/:id', (req: Request, res: Response) => MissionLogController.getMissionLogById(req, res));


/**
 * @swagger
 * /mission-log:
 *   get:
 *     summary: Get all mission logs
 *     tags: [MissionLogs]
 *     responses:
 *       200:
 *         description: List of all mission logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MissionLog'
 */
router.get('/', (req: Request, res: Response) => MissionLogController.getAllMissionLogs(req, res));

/**
 * @swagger
 * /mission-log/{id}:
 *   put:
 *     summary: Update a mission log by ID
 *     tags: [MissionLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mission log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mover:
 *                 type: string
 *                 description: The ID of the mover (referencing MagicMover)
 *                 example: "60d21b4667d0d8992e610c85"
 *               activity:
 *                 type: string
 *                 enum: ['loading', 'on-mission', 'resting']
 *                 description: The current activity of the mover
 *                 example: "on-mission"
 *             required:
 *               - mover
 *               - activity
 *     responses:
 *       200:
 *         description: Mission log updated successfully
 *       404:
 *         description: Mission log not found
 *       400:
 *         description: Invalid request data
 */

router.put('/:id', (req: Request, res: Response) => MissionLogController.updateMissionLog(req, res));

/**
 * @swagger
 * /mission-log/{id}:
 *   delete:
 *     summary: Delete a mission log by ID
 *     tags: [MissionLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mission log ID
 *     responses:
 *       204:
 *         description: Mission log deleted successfully
 *       404:
 *         description: Mission log not found
 */
router.delete('/:id', (req: Request, res: Response) => MissionLogController.deleteMissionLog(req, res));

export default router;
