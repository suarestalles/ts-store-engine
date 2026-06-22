import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaCustomerRepository } from "../repositories/PrismaCustomerRepository";
import { FindCustomerByIdService } from "../services/FindCustomerByIdService";

export class FindCustomerByIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        
        const { id } = request.params as { id: string };

        const repository = new PrismaCustomerRepository();
        const service = new FindCustomerByIdService(repository);

        const customer = await service.execute(id);

        return reply.send(customer);

    }
}