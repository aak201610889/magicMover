import mongoose, { Schema } from 'mongoose';
import { IMissionLog } from '../shared/interfaces/modelInterfaces';
/**
 * Defines the schema for the MissionLog model.
 * 
 * This schema is used to store logs of activities performed by magic movers, 
 * including their state transitions (loading, on-mission, resting) along with the timestamp of when 
 * each activity was logged.
 * 
 * @typedef {Object} MissionLog
 * @property {mongoose.Types.ObjectId} mover - The magic mover associated with this log entry.
 * @property {string} activity - The activity the magic mover is performing ('loading', 'on-mission', or 'resting').
 * @property {Date} timestamp - The timestamp of when the activity was logged.
 */
const MissionLogSchema: Schema = new Schema({
    mover: { type: mongoose.Types.ObjectId, ref: 'MagicMover', required: true },
    activity: { type: String, enum: ['loading', 'on-mission', 'resting'], required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IMissionLog>('MissionLog', MissionLogSchema);
