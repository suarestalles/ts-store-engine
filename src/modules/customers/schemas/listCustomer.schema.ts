import { z } from "zod";

export const listCustomerSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(20),
})