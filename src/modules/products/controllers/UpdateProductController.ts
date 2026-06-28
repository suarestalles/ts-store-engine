import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaProductRepository } from "../repositories/PrismaProductRepository";
import { UpdateProductService } from "../services/UpdateProductService";
import { updateProductSchema } from "../schemas/updateProduct.schema";

export class UpdateProductController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as { id: string };
        const body = updateProductSchema.parse(request.body);

        const repository = new PrismaProductRepository();
        const service = new UpdateProductService(repository);

        const updatedProduct = await service.execute(id, body);

        return reply.send(updatedProduct);
    }
}