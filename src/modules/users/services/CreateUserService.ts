import { IUserRepository } from "../repositories/IUserRepository";
import { CreateUserDTO }  from "../dtos/CreateUserDTO";
import { AppError } from "../../../shared/errors/AppError";
import bcrypt from "bcrypt";

export class CreateUserService {

    constructor(private userRepository: IUserRepository) {}

    async execute(data: CreateUserDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new AppError("Email already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.userRepository.create({
            ...data,
            password: hashedPassword
        });

        // return user;
        const { password, ...userWithoutPassword} = user;

        return userWithoutPassword;
    }

}