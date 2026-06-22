import { ProductImage } from "@prisma/client";
import { ProductImageCreateDTO } from "../dtos/ProductImageCreateDTO";

export interface IProductImageRepository {

    create(data: ProductImageCreateDTO): Promise<ProductImage>;

    delete(id: string): Promise<void>;

    findById(id: string): Promise<ProductImage | null>;

    findByProductId(productId: string): Promise<ProductImage[]>
}