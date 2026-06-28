import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaProductRepository } from "../repositories/PrismaProductRepository";
import { DeleteProductImageService } from "../../product_image/services/DeleteProductImageService";

export class DeleteProductController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as { id: string };

        const repository = new PrismaProductRepository();
        const service = new DeleteProductImageService(repository);

        await service.execute(id);

        return reply.status(204).send();
    }
}