import { FastifyRequest, FastifyReply } from "fastify";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

type JWTPayload = {
    sub: string;
    role: string;
}

export async function ensureAuthenticated(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token Missing", 401);
    }
    
    const [, token] = authHeader.split(" ");
    
    if (!token) {
        throw new AppError("Token Missing", 401);
    }

    try {
        const decoded = jwt.verify(
            token,
            env.JWT_ACCESS_SECRET,
        ) as JWTPayload;

        request.user = {
            id: decoded.sub,
            role: decoded.role,
        };
    } catch {
        throw new AppError("Invalid Token", 401);
    }
}