import {User} from "@prisma/client";
import {CreateUserDTO} from "../dtos/CreateUserDTO";

export interface IUserRepository {
    create(data: CreateUserDTO): Promise<User>;

    findByEmail(email: string): Promise<User | null>;
}