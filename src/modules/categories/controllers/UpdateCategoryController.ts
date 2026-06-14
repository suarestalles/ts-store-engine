import { FastifyReply, FastifyRequest } from "fastify";
import { updateCategorySchema } from "../schemas/updateCategory.schema";
import { PrismaCategoryRepository } from "../repositories/PrismaCategoryRepository";
import { UpdateCategoryService } from "../services/UpdateCategoryService";

export class UpdateCategoryController {
    
    async handler(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as { id: string };
        const body = updateCategorySchema.parse(request.body);

        const repository = new PrismaCategoryRepository();
        const service = new UpdateCategoryService(repository);

        const result = await service.execute(id, body);

        return reply.send(result);
    }
}