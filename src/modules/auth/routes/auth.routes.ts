import { FastifyInstance } from "fastify";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";

export async function authRoutes(app: FastifyInstance) {
    const controller = new AuthenticateUserController();

    app.post("/login", (request, reply) => {
        return controller.handle(request, reply);
    })
}