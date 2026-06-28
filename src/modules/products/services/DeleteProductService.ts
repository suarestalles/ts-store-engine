import { AppError } from "../../../shared/errors/AppError";
import { IProductRepository } from "../repositories/IProductRepository";

export class DeleteProductService {

    constructor(private readonly repository: IProductRepository) {};

    async exec(id: string) {

        const product = await this.repository.findById(id);

        if (!product) {
            throw new AppError("Product not found", 404);
        }
        
        await this.repository.delete(id);

        return;
    }
}