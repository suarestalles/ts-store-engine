import { FastifyReply, FastifyRequest } from "fastify";
import { createProductSchema } from "../schemas/createProduct.schema";
import { PrismaProductRepository } from "../repositories/PrismaProductRepository";
import { CreateProductService } from "../services/CreateProductService";

export class CreateProductController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const body = createProductSchema.parse(request.body);

        const productRepository = new PrismaProductRepository();
        const productService = new CreateProductService(productRepository);

        const product = await productService.execute(body);

        return reply.status(201).send(product);
    }
}