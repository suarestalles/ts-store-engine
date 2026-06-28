import { FastifyReply, FastifyRequest } from "fastify";
import { listProductSchema } from "../schemas/listProduct.schema";
import { PrismaProductRepository } from "../repositories/PrismaProductRepository";
import { ListProductsService } from "../services/ListProductsService";

export class ListProductsController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const query = await listProductSchema.parse(request.query);

        const repository = new PrismaProductRepository();
        const service = new ListProductsService(repository);

        const result = await service.execute(query);

        return reply.send(result);
    }
}