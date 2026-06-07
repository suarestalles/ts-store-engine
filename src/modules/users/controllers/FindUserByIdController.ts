import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { FindUserByIdService } from "../services/FindUserByIdService";

export class FindUserByIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        
        const { id } = request.params as { id: string };

        const repository = new PrismaUserRepository();
        const service = new FindUserByIdService(repository);

        const user = await service.execute(id);

        return reply.send(user);

    }
}