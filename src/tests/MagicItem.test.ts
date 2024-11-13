import request from 'supertest';
import mongoose from 'mongoose';
import MagicItem from '../models/MagicItem';
import  app  from '../../app';
import { connectDBTesting } from '../database/index';
jest.setTimeout(10000); // 10 seconds timeout for each test

describe('MagicItem API', () => {
  let itemId: string | undefined;

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

  test('POST /magic-item - should create a new Magic Item', async () => {
    const res = await request(app)
      .post('/magic-item')
      .send({
        name: 'Item A',
        weight: 100,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    itemId = res.body._id;
  });

  test('GET /magic-item/:id - should fetch a Magic Item by ID', async () => {
    const newItem = await MagicItem.create({
      name: 'Item B',
        weight: 100,
    });
    const res = await request(app).get(`/magic-item/${newItem._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Item B');
  });

 

  test('PUT /magic-item/:id - should update a Magic Item', async () => {
    const newItem = await MagicItem.create({
      name: 'Item A',
      weight: 100,
    });
    const res = await request(app)
      .put(`/magic-item/${newItem._id}`)
      .send({ name: 'Item Updated', weight: 100, });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Item Updated');
  });

  test('DELETE /magic-item/:id - should delete a Magic Item', async () => {
    const newItem = await MagicItem.create({
      name: 'Item A',
        weight: 100,
    });
    const res = await request(app).delete(`/magic-item/${newItem._id}`);
    expect(res.statusCode).toBe(204);
  });

});
