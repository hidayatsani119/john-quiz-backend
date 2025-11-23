"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const client_1 = require("@prisma/client");
const logging_1 = require("./logging");
const adapter = new adapter_mariadb_1.PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
});
const prisma = new client_1.PrismaClient({
    adapter,
    log: [
        { level: "query", emit: "event" },
        { level: "info", emit: "event" },
        { level: "warn", emit: "event" },
        { level: "error", emit: "event" },
    ],
});
exports.prisma = prisma;
prisma.$on("error", (e) => {
    logging_1.logger.error(e);
});
prisma.$on("warn", (e) => {
    logging_1.logger.warn(e);
});
prisma.$on("info", (e) => {
    logging_1.logger.info(e);
});
prisma.$on("query", (e) => {
    logging_1.logger.info(e);
});
//# sourceMappingURL=prisma.js.map