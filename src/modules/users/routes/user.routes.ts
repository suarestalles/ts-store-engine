import { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/CreateUserController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";

export async function userRoutes(app: FastifyInstance) {
    
    const createUserController = new CreateUserController();

    app.post("/users", (request, reply) => {
        return createUserController.handle(request, reply);
    });

    app.get("/me", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return {
            userId: request.user?.id,
            role: request.user?.role,
        };
    });
}