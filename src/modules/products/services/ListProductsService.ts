import { ProductImage } from "@prisma/client";
import { ProductMapper } from "../mappers/ProductMapper";
import { IProductRepository } from "../repositories/IProductRepository";

interface IRequest {
    page: number,
    limit: number
}

export class ListProductsService {

    constructor(private readonly repository: IProductRepository) {};

    async execute({page, limit}: IRequest) {
        const [products, total] = await Promise.all([
            this.repository.findMany({ page, limit }),
            this.repository.count(),
        ]);

        products.map(product => product.images=[{url: "https://radiantbr.com/cdn/shop/files/AbajurGrandeModernoMinimalistaRadiant_9.webp?v=1748635582&width=1024"} as ProductImage])

        return {
            data: products.map(product => ProductMapper.toResponse(product)),
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    }
}