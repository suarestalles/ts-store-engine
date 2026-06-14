import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCategoryRepository } from "../repositories/PrismaCategoryRepository";
import { DeleteCategoryService } from "../services/DeleteCategoryService";

export class DeleteCategoryController {

    async handler(request: FastifyRequest, reply: FastifyReply) {
        
        const { id } = request.params as { id: string };

        const repository = new PrismaCategoryRepository();
        const service = new DeleteCategoryService(repository);

        await service.execute(id);
        
        return reply.status(204).send();
    }
}