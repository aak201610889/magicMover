import mongoose, { Schema } from 'mongoose';
import { IMagicMover } from '../shared/interfaces/modelInterfaces';
/**
 * Defines the schema for the MagicMover model.
 * 
 * This schema is used to store information about magic movers, including their name, weight limit,
 * current state, assigned items, and mission count.
 * 
 * @typedef {Object} MagicMover
 * @property {string} name - The name of the magic mover.
 * @property {number} weightLimit - The maximum weight limit the magic mover can carry.
 * @property {string} currentState - The current state of the magic mover (e.g., 'resting', 'loading', 'on-mission').
 * @property {Array<{item: mongoose.Types.ObjectId, weight: number}>} items - The items assigned to the magic mover.
 * @property {number} missionCount - The number of missions the magic mover has completed.
 */
const MagicMoverSchema: Schema = new Schema({
    name: { type: String, required: true },
    weightLimit: { type: Number, required: true },
    currentState: { type: String, enum: ['resting', 'loading', 'on-mission'], default: 'resting' },
    items: [{ item: { type: mongoose.Types.ObjectId, ref: 'MagicItem' }, weight: Number }],
    missionCount: { type: Number, default: 0 }
});

export default mongoose.model<IMagicMover>('MagicMover', MagicMoverSchema);
