import { FastifyReply, FastifyRequest } from "fastify";
import { refreshTokenSchema } from "../schemas/refreshToken.schema";
import { RefreshTokenService } from "../services/RefreshTokenService";
import { PrismaRefreshTokenRepository } from "../repositories/PrismaRefreshTokenRepository";

export class RefreshTokenController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { refreshToken } = refreshTokenSchema.parse(request.body);

        const repository = new PrismaRefreshTokenRepository();
        const service = new RefreshTokenService(repository);

        const result = await service.execute({refreshToken});

        return reply.send(result);

    }
}