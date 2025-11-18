import request from 'supertest';
import { app } from '../app';
import { prisma } from '../db/client';

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.task.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Task API', () => {
  it('creates a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test task', description: 'Test desc' });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('Test task');
    expect(res.body.status).toBe('pending');
  });

  it('lists tasks', async () => {
    await prisma.task.create({
      data: { title: 'Task 1', description: 'A' }
    });
    await prisma.task.create({
      data: { title: 'Task 2', description: 'B' }
    });

    const res = await request(app).get('/tasks');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  it('gets a task by id', async () => {
    const task = await prisma.task.create({
      data: { title: 'One', description: 'Solo' }
    });

    const res = await request(app).get(`/tasks/${task.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(task.id);
    expect(res.body.title).toBe('One');
  });

  it('returns 404 for missing task', async () => {
    const res = await request(app).get('/tasks/999999');
    expect(res.status).toBe(404);
  });

  it('updates task status', async () => {
    const task = await prisma.task.create({
      data: { title: 'Status test' }
    });

    const res = await request(app)
      .patch(`/tasks/${task.id}/status`)
      .send({ status: 'completed' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('completed');
  });

  it('deletes a task', async () => {
    const task = await prisma.task.create({
      data: { title: 'Delete me' }
    });

    const res = await request(app).delete(`/tasks/${task.id}`);
    expect(res.status).toBe(204);

    const found = await prisma.task.findUnique({ where: { id: task.id } });
    expect(found).toBeNull();
  });
});
