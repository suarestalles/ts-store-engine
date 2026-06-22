import { FastifyReply, FastifyRequest } from "fastify";
import { listCustomerSchema } from "../schemas/listCustomer.schema";
import { PrismaCustomerRepository } from "../repositories/PrismaCustomerRepository";
import { ListCustomerService } from "../services/ListCustomerService";

export class ListCustomersController {

    async handler(request: FastifyRequest, reply: FastifyReply) {

        const query = await listCustomerSchema.parse(request.query);
        
        const repository = new PrismaCustomerRepository();
        const service = new ListCustomerService(repository);

        const result = await service.execute(query);

        return reply.send(result);
    }
}