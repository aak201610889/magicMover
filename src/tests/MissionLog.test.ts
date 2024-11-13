import request from 'supertest';
import mongoose from 'mongoose';
import MissionLog from '../models/MissionLog'; // Adjust this to your correct model path
import app from '../../app';
import { connectDBTesting } from "../database/index";
jest.setTimeout(10000); // 10 seconds timeout for each test

describe('MissionLog API', () => {
  let missionLogId: string;

  beforeAll(async () => {
    try{

      await connectDBTesting();
      console.log('Database connected successfully');
    }
    catch(err){console.warn("err======>",err)}
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('POST /mission-log - should create a new MissionLog', async () => {
    const res = await request(app)
      .post('/mission-log')
      .send({
        mover: '60d21b4667d0d8992e610c85',  // Example MagicMover ID, adjust according to your test data
        activity: 'on-mission',            // One of the valid enum values: 'loading', 'on-mission', 'resting'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    missionLogId = res.body._id;
  });

  test('GET /mission-log/:id - should fetch a MissionLog by ID', async () => {
    const newMissionLog = await MissionLog.create({
      mover: '60d21b4667d0d8992e610c85',  // Example MagicMover ID
      activity: 'loading',
    });
    const res = await request(app).get(`/mission-log/${newMissionLog._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.mover).toBe('60d21b4667d0d8992e610c85');
    expect(res.body.activity).toBe('loading');
  });

  test('GET /mission-log - should retrieve all MissionLogs', async () => {
    await MissionLog.create([
      { mover: '60d21b4667d0d8992e610c85', activity: 'resting' },
      { mover: '60d21b4667d0d8992e610c85', activity: 'on-mission' },
    ]);
    const res = await request(app).get('/mission-log');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });



  test('DELETE /mission-log/:id - should delete a MissionLog', async () => {
    const newMissionLog = await MissionLog.create({
      mover: '60d21b4667d0d8992e610c85',  // Example MagicMover ID
      activity: 'on-mission',
    });
    const res = await request(app).delete(`/mission-log/${newMissionLog._id}`);
    expect(res.statusCode).toBe(204);
  });
});
