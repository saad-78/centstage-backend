"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const task_service_1 = require("../services/task.service");
const parseId = (req) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        const error = new Error('Invalid task id');
        error.status = 400;
        throw error;
    }
    return id;
};
exports.taskController = {
    async list(req, res, next) {
        try {
            const tasks = await task_service_1.taskService.listTasks();
            res.json(tasks);
        }
        catch (err) {
            next(err);
        }
    },
    async get(req, res, next) {
        try {
            const id = parseId(req);
            const task = await task_service_1.taskService.getTaskById(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(task);
        }
        catch (err) {
            next(err);
        }
    },
    async create(req, res, next) {
        try {
            const { title, description } = req.body;
            if (!title || typeof title !== 'string') {
                return res.status(400).json({ message: 'Title is required' });
            }
            const task = await task_service_1.taskService.createTask({ title, description });
            res.status(201).json(task);
        }
        catch (err) {
            next(err);
        }
    },
    async updateStatus(req, res, next) {
        try {
            const id = parseId(req);
            const { status } = req.body;
            if (!status || !['pending', 'completed'].includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }
            const existing = await task_service_1.taskService.getTaskById(id);
            if (!existing) {
                return res.status(404).json({ message: 'Task not found' });
            }
            const updated = await task_service_1.taskService.updateTaskStatus(id, status);
            res.json(updated);
        }
        catch (err) {
            next(err);
        }
    },
    async remove(req, res, next) {
        try {
            const id = parseId(req);
            const existing = await task_service_1.taskService.getTaskById(id);
            if (!existing) {
                return res.status(404).json({ message: 'Task not found' });
            }
            await task_service_1.taskService.deleteTask(id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
};
