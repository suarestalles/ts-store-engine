import { ProductImageCreateDTO } from "../dtos/ProductImageCreateDTO";
import { ProductImageMapper } from "../mappers/ProductImageMapper";
import { IProductImageRepository } from "../repositories/IProductImageRepository";

export class CreateProductImageService {

    constructor(private readonly repository: IProductImageRepository) {};

    async execute(data: ProductImageCreateDTO) {
        
        const productImage = await this.repository.create(data);

        return ProductImageMapper.toResponse(productImage);
    }
}