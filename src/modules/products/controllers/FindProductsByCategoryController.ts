import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaProductRepository } from "../repositories/PrismaProductRepository";
import { FindProductsByCategoryService } from "../services/FindProductsByCategoryService";
import { findProductsByCategorySchema } from "../schemas/findProductsByCategory.schema";

export class FindProductsByCategoryController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const query = await findProductsByCategorySchema.parse(request.query);

        const repository = new PrismaProductRepository();
        const service = new FindProductsByCategoryService(repository);

        const result = await service.execute(query);

        return reply.send(result);
    }
}