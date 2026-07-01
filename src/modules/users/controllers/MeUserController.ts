import { FastifyReply, FastifyRequest } from "fastify";
import { MeUserService } from "../services/MeUserService";
import { PrismaCustomerRepository } from "../../customers/repositories/PrismaCustomerRepository";

export class MeUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { uid } = request.cookies as { uid: string }

        const repository = new PrismaCustomerRepository()
        const service = new MeUserService(repository)

        const me = await service.execute(uid)

        return reply.send(me)
    }
}