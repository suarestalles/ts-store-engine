import { Customer } from "@prisma/client";
import { CustomerCreateDTO } from "../dtos/CustomerCreateDTO";

export interface ICustomerRepository {
    create(data: {}): Promise<Customer>;

    findById(id: string): Promise<Customer | null>;

    findByUserId(userId: string): Promise<Customer | null>;

    findMany(params: { page: number, limit: number }): Promise<Customer[]>;

    count(): Promise<number>;
}