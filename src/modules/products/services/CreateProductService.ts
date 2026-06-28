import { ProductCreateDTO } from "../dtos/ProductCreateDTO";
import { IProductRepository } from "../repositories/IProductRepository";

export class CreateProductService {

    constructor(private readonly repository: IProductRepository) {};

    async execute(data: ProductCreateDTO) {
        const product = await this.repository.create(data);

        return product;
    }
}