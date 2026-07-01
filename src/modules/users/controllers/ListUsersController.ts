import { FastifyRequest, FastifyReply } from "fastify";
import { listUsersSchema } from "../schemas/listUsers.schema";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { ListUserService } from "../services/ListUserService";

export class ListUsersController {

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const query = await listUsersSchema.parse(request.query);

        const repository = new PrismaUserRepository();
        const service = new ListUserService(repository);

        const result = await service.execute(query);

        return reply.send(result);
    }

}