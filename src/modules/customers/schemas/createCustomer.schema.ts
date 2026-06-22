import { z } from "zod";

export const createCustomerSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    phone: z.string(),
    address: z.string(),
    totalOrders: z.number(),
    totalSpent: z.number(),
})

export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;