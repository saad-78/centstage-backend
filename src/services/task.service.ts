import { prisma } from '../db/client';

export type TaskStatus = 'pending' | 'completed';

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskStatusInput {
  status: TaskStatus;
}

export const taskService = {
  async listTasks() {
    return prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  async getTaskById(id: number) {
    return prisma.task.findUnique({ where: { id } });
  },

  async createTask(data: CreateTaskInput) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description ?? null
      }
    });
  },

  async updateTaskStatus(id: number, status: TaskStatus) {
    return prisma.task.update({
      where: { id },
      data: { status }
    });
  },

  async deleteTask(id: number) {
    return prisma.task.delete({
      where: { id }
    });
  }
};
