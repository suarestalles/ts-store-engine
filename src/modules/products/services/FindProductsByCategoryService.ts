import { ProductMapper } from "../mappers/ProductMapper";
import { IProductRepository } from "../repositories/IProductRepository";

interface IRequest {
    categoryId: string,
    page: number,
    limit: number,
}

export class FindProductsByCategoryService {

    constructor(private readonly repository: IProductRepository) {};

    async execute({categoryId, page, limit}: IRequest) {

        const [products, total] = await Promise.all([
            this.repository.findByCategory({ categoryId, page, limit }),
            this.repository.countByCategory({ categoryId, page, limit }),
        ]);

        return {
            data: products.map(product => ProductMapper.toResponse(product)),
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    }
}