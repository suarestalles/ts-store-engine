import { AppError } from "../../../shared/errors/AppError";
import { ProductUpdateDTO } from "../dtos/productUpdateDTO";
import { ProductMapper } from "../mappers/ProductMapper";
import { IProductRepository } from "../repositories/IProductRepository";

export class UpdateProductService {

    constructor(private readonly repository: IProductRepository) {};

    async execute(id: string, data: ProductUpdateDTO) {

        const product = await this.repository.findById(id);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        const updatedProduct = await this.repository.update(id, data);

        return ProductMapper.toResponse(updatedProduct);
    }
}