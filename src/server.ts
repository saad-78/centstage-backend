import { app } from './app';
import { ENV } from './config/env';
import { prisma } from './db/client';

const PORT = ENV.PORT;

async function start() {
  try {
    await prisma.$connect();
    console.log('Connected to database');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
