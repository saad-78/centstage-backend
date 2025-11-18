"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const client_1 = require("./db/client");
const PORT = env_1.ENV.PORT;
async function start() {
    try {
        await client_1.prisma.$connect();
        console.log('Connected to database');
        app_1.app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    }
    catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
}
start();
