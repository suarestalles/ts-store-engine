import { IUserRepository } from "../repositories/IUserRepository";
import { AppError } from "../../../shared/errors/AppError";

export class DeleteUserService {
    constructor(private readonly userRepository: IUserRepository) {};

    async execute(id: string) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        await this.userRepository.delete(id);

        return;
    }
}