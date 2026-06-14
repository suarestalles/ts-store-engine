import { AppError } from "../../../shared/errors/AppError";
import { CategoryUpdateDTO } from "../dtos/CategoryUpdateDTO";
import { CategoryMapper } from "../mappers/CategoryMapper";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

export class UpdateCategoryService {

    constructor(private readonly categoryRepository: ICategoryRepository) {};

    async execute(id: string, data: CategoryUpdateDTO) {
        const category = await this.categoryRepository.findById(id);

        if (category) {
            throw new AppError("User not found", 404);
        }

        const updatedCategory = await this.categoryRepository.update(id, data);

        return CategoryMapper.toResponse(updatedCategory);
    }
}