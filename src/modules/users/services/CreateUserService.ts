import { IUserRepository } from "../repositories/IUserRepository";
import { UserCreateDTO }  from "../dtos/UserCreateDTO";
import { AppError } from "../../../shared/errors/AppError";
import bcrypt from "bcrypt";
import { createCustomerSchema } from "../../customers/schemas/createCustomer.schema";
import { ICustomerRepository } from "../../customers/repositories/ICustomerRepository";

export class CreateUserService {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly customerRepository: ICustomerRepository,
    ) {}

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

        const customerData = createCustomerSchema.parse(data);

        await this.customerRepository.create({
            ...customerData,
            userId: user.id,
        });

        return user;
    }

}