# Cent Stage Backend

Node.js + Express + Prisma + PostgreSQL API for task management.

## Tech stack

- Node.js, Express
- Prisma ORM with PostgreSQL
- Jest + Supertest for tests

## Setup

1. Install dependencies:

npm install


2. Create `.env` from `.env.example` and set:

DATABASE_URL=...
PORT=4000
NODE_ENV=development


3. Run migrations and generate client:

npm run migrate:dev --name init_tasks
npm run prisma:generate


## Development

npm run dev


API base: `http://localhost:4000`

### Main endpoints

- `GET /health` – health check  
- `GET /tasks` – list tasks  
- `GET /tasks/:id` – get single task  
- `POST /tasks` – create task  
- `PATCH /tasks/:id/status` – update status  
- `DELETE /tasks/:id` – delete task  

## Tests

npm test


## Production

npm run build
npm run start

