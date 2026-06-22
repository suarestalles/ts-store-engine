import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaProductImageRepository } from "../repositories/PrismaProductImageRepository";
import { DeleteProductImageService } from "../services/DeleteProductImageService";

export class DeleteProductImageController {

    async handler(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as { id: string }
        
        const repository = new PrismaProductImageRepository();
        const service = new DeleteProductImageService(repository);

        await service.execute(id);

        return reply.status(204).send();
    }
}