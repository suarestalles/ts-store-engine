import { AppError } from "../../../shared/errors/AppError";
import { ProductImageMapper } from "../mappers/ProductImageMapper";
import { IProductImageRepository } from "../repositories/IProductImageRepository";

export class FindProductImageByIdService {

    constructor(private readonly repository: IProductImageRepository) {}

    async execute(id: string) {

        const productImage = await this.repository.findById(id);

        if (!productImage) {
            throw new AppError("Product image not found", 404);
        }

        return ProductImageMapper.toResponse(productImage);
    }
}