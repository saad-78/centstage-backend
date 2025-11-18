import express from 'express';
import cors from 'cors';
import { json } from 'express';
import { taskRouter } from './routes/task.routes';

export const app = express();

app.use(cors());
app.use(json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/tasks', taskRouter);

app.use(
  (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({
      message: err.message || 'Internal server error'
    });
  }
);
