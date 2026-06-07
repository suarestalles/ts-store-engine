import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../../shared/errors/AppError";
import { PrismaRefreshTokenRepository } from "../repositories/PrismaRefreshTokenRepository";
import { LogoutService } from "../services/LogoutService";

export class LogoutController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { refreshToken } = request.body as { refreshToken?: string };
        const userId = request.user?.id;

        if (!userId) {
            return reply.status(401).send({ message: "Unauthorized" });
        }

        const repository = new PrismaRefreshTokenRepository();
        const service = new LogoutService(repository);

        const result = await service.execute({ userId, refreshToken });

        return reply.send(result);

    }
}