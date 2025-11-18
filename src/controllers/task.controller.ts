import { Request, Response, NextFunction } from 'express';
import { taskService, TaskStatus } from '../services/task.service';

const parseId = (req: Request): number => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    const error: any = new Error('Invalid task id');
    error.status = 400;
    throw error;
  }
  return id;
};

export const taskController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.listTasks();
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  },

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req);
      const task = await taskService.getTaskById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;

      if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'Title is required' });
      }

      const task = await taskService.createTask({ title, description });
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req);
      const { status } = req.body as { status?: TaskStatus };

      if (!status || !['pending', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const existing = await taskService.getTaskById(id);
      if (!existing) {
        return res.status(404).json({ message: 'Task not found' });
      }

      const updated = await taskService.updateTaskStatus(id, status);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req);
      const existing = await taskService.getTaskById(id);

      if (!existing) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await taskService.deleteTask(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
