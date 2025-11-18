"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const client_1 = require("../db/client");
exports.taskService = {
    async listTasks() {
        return client_1.prisma.task.findMany({
            orderBy: { createdAt: 'desc' }
        });
    },
    async getTaskById(id) {
        return client_1.prisma.task.findUnique({ where: { id } });
    },
    async createTask(data) {
        return client_1.prisma.task.create({
            data: {
                title: data.title,
                description: data.description ?? null
            }
        });
    },
    async updateTaskStatus(id, status) {
        return client_1.prisma.task.update({
            where: { id },
            data: { status }
        });
    },
    async deleteTask(id) {
        return client_1.prisma.task.delete({
            where: { id }
        });
    }
};
