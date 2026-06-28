import { User } from "@prisma/client";
import { UserCreateDTO } from "../dtos/UserCreateDTO";
import { UserUpdateDTO } from "../dtos/UserUpdateDTO";

export interface IUserRepository {
    create(data: {}): Promise<User>;

    findByEmail(email: string): Promise<User | null>;

    findById(id: string): Promise<User | null>;

    findMany(params: { page: number, limit: number }): Promise<User[]>;

    count(): Promise<number>;

    update(id: string, data: UserUpdateDTO): Promise<User>;

    delete(id: string): Promise<void>;
}