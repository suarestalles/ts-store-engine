import { FastifyRequest, FastifyReply } from "fastify";
import { authenticateUserSchema } from "../schemas/authenticateUser.schema";
import { PrismaUserRepository } from "../../users/repositories/PrismaUserRepository";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthenticateUserController {
    
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const body = authenticateUserSchema.parse(request.body);

        const userRepository = new PrismaUserRepository();
        const service = new AuthenticateUserService(userRepository);
        
        const result = await service.execute(body);

        return reply.send(result);
    }

}