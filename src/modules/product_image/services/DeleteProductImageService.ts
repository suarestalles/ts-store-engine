import { AppError } from "../../../shared/errors/AppError";
import { IProductImageRepository } from "../repositories/IProductImageRepository";

export class DeleteProductImageService {

    constructor(private readonly repository: IProductImageRepository) {};

    async execute(id: string) {
        const productImage = await this.repository.findById(id);

        if (!productImage) {
            throw new AppError("Product image not found", 404);
        }

        await this.repository.delete(id);

        return;
    }
}