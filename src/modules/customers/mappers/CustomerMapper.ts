import { Customer } from "@prisma/client";

export class CustomerMapper {
    static toResponse(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            totalOrders: customer.totalOrders,
            totalSpent: customer.totalSpent,
            address: customer.address,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        }
    }   
}