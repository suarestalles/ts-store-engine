import { z } from "zod";

export const listProductSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(20),
    categoryId: z.coerce.number().optional()
});

export type ListProductSchema = z.infer<typeof listProductSchema>;