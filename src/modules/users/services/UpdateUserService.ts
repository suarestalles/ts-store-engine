import { IUserRepository } from "../repositories/IUserRepository";
import { UserUpdateDTO } from "../dtos/UserUpdateDTO";
import { AppError } from "../../../shared/errors/AppError";
import { UserMapper } from "../mappers/UserMapper";

export class UpdateUserService {
    constructor(private readonly userRepository: IUserRepository) {};

    async execute(id: string, data: UserUpdateDTO) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (data.email) {
            const existingUser = await this.userRepository.findByEmail(data.email);

            if (existingUser && existingUser.id !== id) {
                throw new AppError("Email already in use", 400);
            }
        }

        const updatedUser = await this.userRepository.update(id, data);

        return UserMapper.toResponse(updatedUser);
    }
}