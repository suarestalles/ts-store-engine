import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaProductImageRepository } from "../repositories/PrismaProductImageRepository";
import { FindProductImageByIdService } from "../services/FindProductImageByIdService";

export class FindProductImageByIdController {

    async handler(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as { id: string };

        const repository = new PrismaProductImageRepository();
        const service = new FindProductImageByIdService(repository);

        const productImage = await service.execute(id);

        return reply.send(productImage);
    }
}