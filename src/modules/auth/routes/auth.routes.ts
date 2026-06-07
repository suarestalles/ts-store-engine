import { FastifyInstance } from "fastify";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { RefreshTokenController } from "../controllers/RefreshTokenController";
import { LogoutController } from "../controllers/LogoutController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";

export async function authRoutes(app: FastifyInstance) {

    const controller = new AuthenticateUserController();
    const refreshTokenController = new RefreshTokenController();
    const logoutController = new LogoutController();

    app.post("/login", (request, reply) => {
        return controller.handle(request, reply);
    })

    app.post("/auth/refresh", async (request, reply) => {
        return refreshTokenController.handle(request, reply);
    })

    app.post("/auth/logout-all", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return logoutController.handle(request, reply);
    })
}