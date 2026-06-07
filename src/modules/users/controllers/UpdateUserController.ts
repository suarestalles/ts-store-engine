import { FastifyRequest, FastifyReply } from "fastify";
import { updateUserSchema } from "../schemas/updateUser.schema";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { UpdateUserService } from "../services/UpdateUserService";

export class UpdateUserController {
    async handler(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as { id: string };
        const body = updateUserSchema.parse(request.body);

        const repository = new PrismaUserRepository();
        const service = new UpdateUserService(repository);

        const result = await service.execute(id, body);

        return reply.send(result);

    }
}