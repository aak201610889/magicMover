import mongoose, { Schema } from 'mongoose';
import { IMagicItem } from '../shared/interfaces/modelInterfaces';
/**
 * Defines the schema for the MagicItem model.
 * 
 * This schema is used to store information about magic items, such as their name and weight.
 * 
 * @typedef {Object} MagicItem
 * @property {string} name - The name of the magic item.
 * @property {number} weight - The weight of the magic item.
 */
const MagicItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
});

export default mongoose.model<IMagicItem>('MagicItem', MagicItemSchema);
