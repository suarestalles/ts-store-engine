import { AppError } from "../../../shared/errors/AppError";
import { IProductRepository } from "../../products/repositories/IProductRepository";

export class DeleteProductImageService {

    constructor(private readonly repository: IProductRepository) {};

    async execute(id: string) {
        const productImage = await this.repository.findById(id);

        if (!productImage) {
            throw new AppError("Product image not found", 404);
        }

        await this.repository.delete(id);

        return;
    }
}