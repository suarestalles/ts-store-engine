import { FastifyReply, FastifyRequest } from "fastify";
import { listCategorySchema } from "../schemas/listCategory.schema";
import { PrismaCategoryRepository } from "../repositories/PrismaCategoryRepository";
import { ListCategoryService } from "../services/ListCategoryService";

export class ListCategoryController {

    async handler(request: FastifyRequest, reply: FastifyReply) {
        const query = await listCategorySchema.parse(request.query);

        const repository = new PrismaCategoryRepository();
        const service = new ListCategoryService(repository);

        const result = await service.execute(query);

        return reply.send(result);
    }
}