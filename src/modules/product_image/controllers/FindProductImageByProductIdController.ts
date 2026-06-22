import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaProductImageRepository } from "../repositories/PrismaProductImageRepository";
import { FindProductImageByProductIdService } from "../services/FindProductImageByProductIdService";

export class FindProductImageByProductIdController {

    async handler(request: FastifyRequest, reply: FastifyReply) {
        
        const { productId } = request.params as { productId: string };

        const repository = new PrismaProductImageRepository();
        const service = new FindProductImageByProductIdService(repository);
        
        const productImages = await service.execute(productId);

        return reply.send(productImages);
    }
}