import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaProductRepository } from "../repositories/PrismaProductRepository";
import { FindProductByIdService } from "../services/FindProductByIdService";

export class FindProductByIdController {

    async handle(request: FastifyRequest, reply: FastifyReply) {
        
        const { id } = request.params as { id: string };

        const repository = new PrismaProductRepository();
        const service = new FindProductByIdService(repository);

        const product = await service.execute(id);

        return reply.send(product);
    }
}