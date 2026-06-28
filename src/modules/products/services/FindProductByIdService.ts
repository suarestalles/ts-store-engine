import { AppError } from "../../../shared/errors/AppError";
import { ProductMapper } from "../mappers/ProductMapper";
import { IProductRepository } from "../repositories/IProductRepository";

export class FindProductByIdService {

    constructor(private readonly repository: IProductRepository) {};

    async execute(id: string) {

        const product = await this.repository.findById(id);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        return ProductMapper.toResponse(product);
    }
}