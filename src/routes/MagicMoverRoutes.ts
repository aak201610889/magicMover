import express, { Request, Response, Router } from "express";
import {MagicMoverController} from "../controllers/MagicMoverController";
import MagicMoverService from "services/MagicMoverService";
import { container } from "tsyringe";

const router: Router = express.Router();

const magicMoverController = container.resolve(MagicMoverController);

/**
 * @swagger
 * /magic-mover:
 *   post:
 *     summary: Create a Magic Mover
 *     description: Creates a new Magic Mover
 *     tags: [MagicMover]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               weightLimit:
 *                 type: number
 *     responses:
 *       201:
 *         description: Magic Mover created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", (req: Request, res: Response) => 
    magicMoverController.createMagicMover(req, res)
);

/**
 * @swagger
 * /magic-mover/{id}:
 *   get:
 *     summary: Get a Magic Mover by ID
 *     description: Fetches a Magic Mover by its ID
 *     tags: [MagicMover]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Magic Mover ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Magic Mover found
 *       404:
 *         description: Magic Mover not found
 */
router.get("/:id", (req: Request, res: Response) => 
    magicMoverController.getMagicMoverById(req, res)
);

/**
 * @swagger
 * /magic-mover:
 *   get:
 *     summary: Get all Magic Movers
 *     description: Retrieves a paginated list of Magic Movers
 *     tags: [MagicMover]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of results per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of Magic Movers
 *       400:
 *         description: Invalid parameters
 */
router.get("/", (req: Request, res: Response) => 
    magicMoverController.getAllMagicMovers(req, res)
);

/**
 * @swagger
 * /magic-mover/{id}:
 *   put:
 *     summary: Update a Magic Mover
 *     description: Updates an existing Magic Mover
 *     tags: [MagicMover]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Magic Mover ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               weightLimit:
 *                 type: number
 *     responses:
 *       200:
 *         description: Magic Mover updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Magic Mover not found
 */
router.put("/:id", (req: Request, res: Response) => 
    magicMoverController.updateMagicMover(req, res)
);

/**
 * @swagger
 * /magic-mover/{id}:
 *   delete:
 *     summary: Delete a Magic Mover
 *     description: Deletes a Magic Mover by ID
 *     tags: [MagicMover]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Magic Mover ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Magic Mover deleted successfully
 *       404:
 *         description: Magic Mover not found
 */
router.delete("/:id", (req: Request, res: Response) => 
    magicMoverController.deleteMagicMover(req, res)
);


/**
 * @swagger
 * /magic-mover/{id}/load:
 *   post:
 *     summary: Load a Magic Mover with a Magic Item
 *     tags:
 *       - Magic Mover
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Magic Mover to load
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: The ID of the Magic Item to load onto the mover
 *     responses:
 *       200:
 *         description: Mover loaded successfully with the specified item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the loaded Magic Mover
 *                 name:
 *                   type: string
 *                   description: The name of the Magic Mover
 *                 weightLimit:
 *                   type: number
 *                   description: The weight limit of the Magic Mover
 *                 currentState:
 *                   type: string
 *                   enum: [resting, loading, on-mission]
 *                   description: The current state of the Magic Mover
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item:
 *                         type: string
 *                         description: The ID of the Magic Item
 *                       weight:
 *                         type: number
 *                         description: The weight of the Magic Item
 *                 missionCount:
 *                   type: number
 *                   description: The number of missions completed by the mover
 *       400:
 *         description: Bad request, e.g., mover not in loading state, item not found, or weight limit exceeded
 *       500:
 *         description: Internal server error
 */

router.post("/:id/load", (req: Request, res: Response) =>
    magicMoverController.loadMover(req, res)
);

/**
 * @swagger
 * /magic-mover/{id}/start-mission:
 *   post:
 *     summary: Start a mover mission by ID
 *     tags:
 *       - Magic Mover
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Magic Mover
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mission started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the Magic Mover
 *                 name:
 *                   type: string
 *                   description: The name of the Magic Mover
 *                 weightLimit:
 *                   type: number
 *                   description: The weight limit of the Magic Mover
 *                 currentState:
 *                   type: string
 *                   enum: [resting, loading, on-mission]
 *                   description: The current state of the Magic Mover
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item:
 *                         type: string
 *                         description: The ID of the Magic Item
 *                       weight:
 *                         type: number
 *                         description: The weight of the Magic Item
 *                 missionCount:
 *                   type: number
 *                   description: The number of missions completed by the mover
 *       400:
 *         description: Bad request, e.g., mover not in loading state
 *       500:
 *         description: Internal server error
 */

router.post("/:id/start-mission", (req: Request, res: Response) =>
    magicMoverController.startMoverMission(req, res)
);

/**
 * @swagger
 * /magic-mover/{id}/end-mission:
 *   post:
 *     summary: End a mover mission by ID
 *     tags: [Magic Mover]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the mover
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mission ended successfully
 *       400:
 *         description: Bad request
 */
router.post("/:id/end-mission", (req: Request, res: Response) =>
    magicMoverController.endMoverMission(req, res)
);

/**
 * @swagger
 * /magic-mover/movers/top-movers:
 *   get:
 *     summary: Get the top movers
 *     tags: [Magic Mover]
 *     responses:
 *       200:
 *         description: List of top movers
 *       400:
 *         description: Bad request
 */
router.get("/movers/top-movers", (req: Request, res: Response) =>
{

    magicMoverController.listTopMovers(req, res)
}
);
export default router;
