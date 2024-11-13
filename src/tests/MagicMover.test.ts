import request from 'supertest';
import mongoose from 'mongoose';
import  app  from '../../app';
import MagicMover from '../models/MagicMover';
import  { IMagicItem, IMagicMover } from '../shared/interfaces/modelInterfaces';
import { connectDBTesting } from "../database/index";
import MagicItem from '../models/MagicItem';
jest.setTimeout(10000); // 10 seconds timeout for each test

describe('MagicMover API', () => {
  let moverId: string;

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

  test('POST /magic-mover - should create a new Magic Mover', async () => {
    const res = await request(app)
      .post('/magic-mover')
      .send({
        name: 'Mover A',
        weightLimit: 500,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    moverId = res.body._id;
  });

  test('GET /magic-mover/:id - should fetch a Magic Mover by ID', async () => {
    const newMover: IMagicMover = await MagicMover.create({ name: 'Mover B', weightLimit: 400 });
    const res = await request(app).get(`/magic-mover/${newMover._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Mover B');
  });

  test('GET /magic-mover - should retrieve  list of Magic Movers', async () => {
    await MagicMover.create([{ name: 'Mover C', weightLimit: 300 }, { name: 'Mover D', weightLimit: 700 }]);
    const res = await request(app).get('/magic-mover');
    expect(res.statusCode).toBe(200);
    
  });

  test('PUT /magic-mover/:id - should update a Magic Mover', async () => {
    const newMover: IMagicMover = await MagicMover.create({ name: 'Mover E', weightLimit: 600 });
    const res = await request(app)
      .put(`/magic-mover/${newMover._id}`)
      .send({ name: 'Mover Updated', weightLimit: 650 });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Mover Updated');
  });

  test('DELETE /magic-mover/:id - should delete a Magic Mover', async () => {
    const newMover: IMagicMover = await MagicMover.create({ name: 'Mover F', weightLimit: 800 });
    const res = await request(app).delete(`/magic-mover/${newMover._id}`);
    expect(res.statusCode).toBe(204);
  });



  test('POST /magic-mover/:id/load - should load a mover by ID', async () => {
    // Create a new mover and an item
    const newMover: IMagicMover = await MagicMover.create({ 
      name: 'Mover G', 
      weightLimit: 1000,
      currentState: 'resting' // Ensure it starts in the 'resting' state
    });
  
    const newMoverItem: IMagicItem = await MagicItem.create({ 
      name: 'Mover G Item', 
      weight: 1000 
    });
  
    // Load the mover with the item
    const res = await request(app)
      .post(`/magic-mover/${newMover._id}/load`)
      .send({ itemId: newMoverItem._id });
  
    // Check that the load was successful
    expect(res.statusCode).toBe(200);
    expect(res.body.currentState).toBe('loading'); // The mover should be in the loading state after loading
    expect(res.body.items).toHaveLength(1);  // Ensure that the item has been added to the mover
  });
  
  test('POST /magic-mover/:id/start-mission - should start a mover mission', async () => {
    // Create a new mover
    const newMover: IMagicMover = await MagicMover.create({ 
      name: 'Mover H', 
      weightLimit: 1200,
      currentState: 'loading'  // Ensure the mover is in the 'loading' state before starting the mission
    });
  
    // Start the mission
    const res = await request(app)
      .post(`/magic-mover/${newMover._id}/start-mission`);
  
    // Check that the mission start was successful
    expect(res.statusCode).toBe(200);
    expect(res.body.currentState).toBe('on-mission'); // The mover should now be on a mission
  });
  
  test('POST /magic-mover/:id/end-mission - should end a mover mission', async () => {
    // Create a new mover
    const newMover: IMagicMover = await MagicMover.create({ 
      name: 'Mover I', 
      weightLimit: 1400,
      currentState: 'on-mission' // Ensure the mover is in the 'on-mission' state before ending the mission
    });
  
    // End the mission
    const res = await request(app)
      .post(`/magic-mover/${newMover._id}/end-mission`);
  
    // Check that the mission end was successful
    expect(res.statusCode).toBe(200);
    expect(res.body.currentState).toBe('resting'); // The mover should be resting after mission ends
  });


  test('GET /magic-mover/movers/top-movers - should retrieve top movers', async () => {
    const res = await request(app).get('/magic-mover/movers/top-movers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
