import { Document, ObjectId, Types } from 'mongoose';

/**
 * Interface representing a Magic Mover.
 * @interface IMagicMover
 * @extends {Document}
 * @property {string} name - The name of the mover.
 * @property {number} weightLimit - The maximum weight the mover can handle.
 * @property {'resting' | 'loading' | 'on-mission'} currentState - The current state of the mover.
 * @property {Array<{ item: Types.ObjectId; weight: number }>} items - The list of items being moved with their weight.
 * @property {number} missionCount - The total number of missions completed by the mover.
 */
export interface IMagicMover extends Document {
    name: string;
    weightLimit: number;
    currentState: 'resting' | 'loading' | 'on-mission';
    items: Array<{ item: Types.ObjectId; weight: number }>;
    missionCount: number;
}

/**
 * Interface representing a Magic Item.
 * @interface IMagicItem
 * @extends {Document}
 * @property {ObjectId} _id - The unique identifier of the item.
 * @property {string} name - The name of the item.
 * @property {number} weight - The weight of the item.
 */
export interface IMagicItem extends Document {
    _id: ObjectId;
    name: string;
    weight: number;
}

/**
 * Interface representing a Mission Log.
 * @interface IMissionLog
 * @extends {Document}
 * @property {Types.ObjectId} mover - The ID of the mover.
 * @property {'loading' | 'on-mission' | 'resting'} activity - The activity performed by the mover.
 * @property {Date} timestamp - The time the activity was logged.
 */
export interface IMissionLog extends Document {
    mover: Types.ObjectId;
    activity: 'loading' | 'on-mission' | 'resting';
    timestamp: Date;
}
