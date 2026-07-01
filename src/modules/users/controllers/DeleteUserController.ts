import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { DeleteUserService } from "../services/DeleteUserService";


export class DeleteUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const id = request.user?.id ?? '';

        const repository = new PrismaUserRepository();
        const service = new DeleteUserService(repository);

        await service.execute(id);

        return reply.status(204).send();
    }
}