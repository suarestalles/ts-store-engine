import { FastifyReply, FastifyRequest } from "fastify";
import { createProductImageSchema } from "../schemas/createProductImage.schema";
import { PrismaProductImageRepository } from "../repositories/PrismaProductImageRepository";
import { CreateProductImageService } from "../services/CreateProductImageService";

export class CreateProductImageController {

    async handler(request: FastifyRequest, reply: FastifyReply) {

        const body = createProductImageSchema.parse(request.body);

        const repository = new PrismaProductImageRepository();
        const service = new CreateProductImageService(repository);

        const productImage = await service.execute(body)

        return reply.status(201).send(productImage);
    }
}