import { FastifyInstance } from "fastify";
import cookie from "@fastify/cookie";

export async function registerCookies(app: FastifyInstance) {
    await app.register(cookie, {
        secret: process.env.COOKIE_SECRET,
    })
}