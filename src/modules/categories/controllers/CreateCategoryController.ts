import { FastifyReply, FastifyRequest } from "fastify";
import { createCategorySchema } from "../schemas/createCategory.schema";
import { PrismaCategoryRepository } from "../repositories/PrismaCategoryRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

export class CreateCategoryController {
    async handler(request: FastifyRequest, reply: FastifyReply) {
        
        const body = createCategorySchema.parse(request.body);
        
        const categoryRepository = new PrismaCategoryRepository();
        const createCategoryService = new CreateCategoryService(categoryRepository);

        const category = await createCategoryService.execute(body);

        return reply.status(201).send(category)
    }
}