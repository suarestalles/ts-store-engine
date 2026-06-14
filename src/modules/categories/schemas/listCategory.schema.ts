import { z } from "zod";

export const listCategorySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(20),
});

export type ListCategorySchema = z.infer<typeof listCategorySchema>;