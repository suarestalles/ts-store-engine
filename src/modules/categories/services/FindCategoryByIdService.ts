import { AppError } from "../../../shared/errors/AppError";
import { CategoryMapper } from "../mappers/CategoryMapper";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

export class FindCategoryByIdService {

    constructor(private readonly categoryRepository: ICategoryRepository) {};

    async execute(id: string) {
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new AppError("Category not found", 404);
        }
        
        return CategoryMapper.toResponse(category);
    }
}