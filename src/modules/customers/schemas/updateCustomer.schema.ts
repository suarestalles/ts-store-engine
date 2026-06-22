import { z } from "zod";

export const updateCustomerSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    totalOrders: z.number().optional(),
    totalSpent: z.number().optional(),
})