import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

export async function registerCors(app: FastifyInstance) {
    await app.register(cors, {
        origin: process.env.FRONT_URL ?? "http://localhost:3000",
        credentials: true,
    })
}