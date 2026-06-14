import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCategoryRepository } from "../repositories/PrismaCategoryRepository";
import { FindCategoryByIdService } from "../services/FindCategoryByIdService";

export class FindCategoryByIdController {

    async handler(request: FastifyRequest, reply: FastifyReply) {
        
        const { id } = request.params as { id: string };
        
        const repository = new PrismaCategoryRepository();
        const service = new FindCategoryByIdService(repository);

        const category = await service.execute(id);

        return reply.send(category);
    }
}