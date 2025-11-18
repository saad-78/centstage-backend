import { Router } from "express";
import { taskController } from '../controllers/task.controller';

export const taskRouter = Router();

taskRouter.get('/', taskController.list);
taskRouter.get('/:id', taskController.get);
taskRouter.post('/', taskController.create);
taskRouter.patch('/:id/status', taskController.updateStatus);
taskRouter.delete('/:id', taskController.remove);
