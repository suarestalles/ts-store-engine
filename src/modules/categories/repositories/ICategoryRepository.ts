import { Category } from "@prisma/client";
import { CategoryCreateDTO } from "../dtos/CategoryCreateDTO";
import { CategoryUpdateDTO } from "../dtos/CategoryUpdateDTO";

export interface ICategoryRepository {
    create(data: CategoryCreateDTO): Promise<Category>;

    update(id: string, data: CategoryUpdateDTO): Promise<Category>;

    findById(id: string): Promise<Category | null>;

    findMany(params: { page: number, limit: number}): Promise<Category[]>;
    
    count(): Promise<number>;

    delete(id: string): Promise<void>;
}