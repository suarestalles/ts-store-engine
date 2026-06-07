import { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/CreateUserController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { FindUserByIdController } from "../controllers/FindUserByIdController";
import { ListUsersController } from "../controllers/ListUsersController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { DeleteUserController } from "../controllers/DeleteUserController";

export async function userRoutes(app: FastifyInstance) {
    
    const createUserController = new CreateUserController();
    const findUserByIdController = new FindUserByIdController();
    const listUsersController = new ListUsersController();
    const updateUserController = new UpdateUserController();
    const deleteUserController = new DeleteUserController();

    app.post("/users", (request, reply) => {
        return createUserController.handle(request, reply);
    });

    app.get("/users/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return findUserByIdController.handle(request, reply);
    });

    app.get("/users", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return listUsersController.handler(request, reply);
    });

    app.patch("/users/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return updateUserController.handler(request, reply);
    });

    app.delete("/users/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return deleteUserController.handler(request, reply);
    })
}