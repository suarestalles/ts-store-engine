import { IUserRepository } from "../repositories/IUserRepository";
import { UserCreateDTO }  from "../dtos/UserCreateDTO";
import { AppError } from "../../../shared/errors/AppError";
import bcrypt from "bcrypt";

export class CreateUserService {

    constructor(private readonly userRepository: IUserRepository) {}

    async execute(data: UserCreateDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new AppError("Email already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.userRepository.create({
            ...data,
            password: hashedPassword
        });

        return user;
    }

}