import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { DeleteUserService } from "../services/DeleteUserService";


export class DeleteUserController {
    async handler(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new PrismaUserRepository();
        const service = new DeleteUserService(repository);

        await service.execute(id);

        return reply.status(204).send();
    }
}