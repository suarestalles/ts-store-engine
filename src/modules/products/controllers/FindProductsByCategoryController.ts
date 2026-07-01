import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaProductRepository } from "../repositories/PrismaProductRepository";
import { FindProductsByCategoryService } from "../services/FindProductsByCategoryService";
import { findProductsByCategorySchema } from "../schemas/findProductsByCategory.schema";

export class FindProductsByCategoryController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const query = findProductsByCategorySchema.parse(request.query);
        const { categoryId } = request.params as { categoryId: string }

        const repository = new PrismaProductRepository();
        const service = new FindProductsByCategoryService(repository);

        const result = await service.execute({...query, categoryId});

        return reply.send(result);
    }
}