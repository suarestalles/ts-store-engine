import { Product } from "@prisma/client";
import { ProductCreateDTO } from "../dtos/ProductCreateDTO";
import { ProductUpdateDTO } from "../dtos/productUpdateDTO";
import { ProductWithRelations } from "../mappers/ProductMapper";

export interface IProductRepository {

    create(data: ProductCreateDTO): Promise<Product>;
    
    update(id: string, data: ProductUpdateDTO): Promise<ProductWithRelations>;

    findById(id: string): Promise<ProductWithRelations | null>;

    findMany(params: { page: number, limit: number}): Promise<ProductWithRelations[]>;

    findByCategory(params: { categoryId: string, page: number, limit: number}): Promise<ProductWithRelations[]>;

    delete(id: string): Promise<void>;

    count(): Promise<number>;

    countByCategory(params: { categoryId: string, page: number, limit: number}): Promise<number>;
}