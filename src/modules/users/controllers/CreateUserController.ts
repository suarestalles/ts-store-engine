import { FastifyRequest, FastifyReply } from "fastify";
import { createUserSchema } from "../schemas/createUser.schema";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        
        const body = createUserSchema.parse(request.body);

        const userRepository = new PrismaUserRepository();
        const createUserService = new CreateUserService(userRepository);

        const user = await createUserService.execute(body);

        return reply.status(201).send(user);

    }
}