import { FastifyInstance } from "fastify";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { FindCustomerByIdController } from "../controllers/FindCustomerByIdController";
import { ListCustomersController } from "../controllers/ListCustomersController";

export async function customerRoutes(app: FastifyInstance) {
    
    const findCustomerByIdController = new FindCustomerByIdController();
    const listCustomersController = new ListCustomersController();

    app.get("/customers/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return findCustomerByIdController.handle(request, reply);
    });

    app.get("/customers", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return listCustomersController.handler(request, reply);
    });
}