import { z } from "zod";

export const updateCategorySchema = z.object({
    name: z.string().min(3),
})

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;