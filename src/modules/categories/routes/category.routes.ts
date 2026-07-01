import { FastifyInstance } from "fastify";
import { CreateCategoryController } from "../controllers/CreateCategoryController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { UpdateCategoryController } from "../controllers/UpdateCategoryController";
import { FindCategoryByIdController } from "../controllers/FindCategoryByIdController";
import { ListCategoryController } from "../controllers/ListCategoryController";
import { DeleteCategoryController } from "../controllers/DeleteCategoryController";

export async function categoryRoutes(app: FastifyInstance) {

    const createCategoryController = new CreateCategoryController();
    const updateCategoryController = new UpdateCategoryController();
    const findCategoryByIdController = new FindCategoryByIdController();
    const listCategoryController = new ListCategoryController();
    const deleteCategoryController = new DeleteCategoryController();

    app.post("/categories", async (request, reply) =>  {
        return await createCategoryController.handler(request, reply);
    })

    app.patch("/categories/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return await updateCategoryController.handler(request, reply);
    })

    app.get("/categories/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return await findCategoryByIdController.handler(request, reply);
    })

    app.get("/categories", async (request, reply) => {
        return await listCategoryController.handler(request, reply);
    })

    app.delete("/categories/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return await deleteCategoryController.handler(request, reply);
    })

}