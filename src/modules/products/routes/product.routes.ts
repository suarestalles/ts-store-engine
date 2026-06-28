import { FastifyInstance } from "fastify";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { CreateProductController } from "../controllers/CreateProductController";
import { FindProductByIdController } from "../controllers/FindProductByIdController";
import { ListProductsController } from "../controllers/ListProductsController";
import { FindProductsByCategoryController } from "../controllers/FindProductsByCategoryController";
import { UpdateProductController } from "../controllers/UpdateProductController";
import { DeleteProductController } from "../controllers/DeleteProductController";

export async function productRoutes(app: FastifyInstance) {
    
    const createProductController = new CreateProductController();
    const findProductByIdController = new FindProductByIdController();
    const listProductsController = new ListProductsController();
    const findProductsByCategoryController = new FindProductsByCategoryController();
    const updateProductController = new UpdateProductController();
    const deleteProductController = new DeleteProductController();

    app.post("/products", {preHandler: [ensureAuthenticated]}, (request, reply) => {
        return createProductController.handle(request, reply);
    });

    app.get("/products/:id", async (request, reply) => {
        return findProductByIdController.handle(request, reply);
    });

    app.get("/products", async (request, reply) => {
        return listProductsController.handle(request, reply);
    });

    app.get("/products/category/:categoryId", async (request, reply) => {
        return findProductsByCategoryController.handle(request, reply);
    });

    app.patch("/products/:id", {preHandler:[ensureAuthenticated]}, async (request, reply) => {
        return updateProductController.handle(request, reply);
    });

    app.delete("/products/:id", {preHandler: [ensureAuthenticated]}, async (request, reply) => {
        return deleteProductController.handle(request, reply);
    });
}