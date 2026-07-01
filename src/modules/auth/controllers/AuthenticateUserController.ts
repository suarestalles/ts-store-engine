import { FastifyRequest, FastifyReply } from "fastify";
import { authenticateUserSchema } from "../schemas/authenticateUser.schema";
import { PrismaUserRepository } from "../../users/repositories/PrismaUserRepository";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { PrismaRefreshTokenRepository } from "../repositories/PrismaRefreshTokenRepository";

export class AuthenticateUserController {
    
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const body = authenticateUserSchema.parse(request.body);

        const userRepository = new PrismaUserRepository();
        const refreshRepository = new PrismaRefreshTokenRepository();
        const service = new AuthenticateUserService(refreshRepository, userRepository);
        
        const result = await service.execute(body);

        reply.setCookie(
            "accessToken", result.accessToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 60 * 15,
            }
        ).setCookie(
            "refreshToken", result.refreshToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV == "production",
                path: "/",
                maxAge: 60 * 15,
            }
        ).setCookie(
            "uid", result.user.id, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV == "production",
                path: "/",
            }
        );

        return reply.send({
            id: result.user.id,
            email: result.user.email,
            role: result.user.role,
        })
    }

}