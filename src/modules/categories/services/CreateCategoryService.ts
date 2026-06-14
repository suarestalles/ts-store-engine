import { CategoryCreateDTO } from "../dtos/CategoryCreateDTO";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

export class CreateCategoryService {
    
    constructor(private readonly categoryRepository: ICategoryRepository) {};
    
    async execute(data: CategoryCreateDTO) {
        const category = await this.categoryRepository.create(data);
        
        return category;
    }
}