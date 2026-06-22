import { FastifyInstance } from "fastify";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { CreateProductImageController } from "../controllers/CreateProductImageController";
import { DeleteProductImageController } from "../controllers/DeleteProductImageController";
import { FindProductImageByIdController } from "../controllers/FindProductImageByIdController";
import { FindProductImageByProductIdController } from "../controllers/FindProductImageByProductIdController";

export async function productImageRoutes(app: FastifyInstance) {

    const createProductImageController = new CreateProductImageController();
    const deleteProductImageController = new DeleteProductImageController();
    const findProductImageByIdController = new FindProductImageByIdController();
    const findProductImageByProductIdController = new FindProductImageByProductIdController();

    app.post("/product_images", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return await createProductImageController.handler(request, reply);
    })

    app.delete("/product_images/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return await deleteProductImageController.handler(request, reply);
    })

    app.get("/product_images/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return await findProductImageByIdController.handler(request, reply);
    })

    app.get("/product_images/:product_id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return await findProductImageByProductIdController.handler(request, reply);
    })

}