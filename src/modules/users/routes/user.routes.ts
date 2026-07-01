import { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/CreateUserController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { FindUserByIdController } from "../controllers/FindUserByIdController";
import { ListUsersController } from "../controllers/ListUsersController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { MeUserController } from "../controllers/MeUserController";

export async function userRoutes(app: FastifyInstance) {
    
    const createUserController = new CreateUserController();
    const meUserController = new MeUserController();
    const findUserByIdController = new FindUserByIdController();
    const listUsersController = new ListUsersController();
    const updateUserController = new UpdateUserController();
    const deleteUserController = new DeleteUserController();

    app.post("/users", (request, reply) => {
        return createUserController.handle(request, reply);
    });

    app.get("/users/me", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return meUserController.handle(request, reply);
    });

    app.get("/users/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return findUserByIdController.handle(request, reply);
    });

    app.get("/users", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return listUsersController.handle(request, reply);
    });

    app.patch("/users", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return updateUserController.handle(request, reply);
    });

    app.delete("/users", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return deleteUserController.handle(request, reply);
    })
}