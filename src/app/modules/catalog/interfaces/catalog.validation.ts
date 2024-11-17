import { z } from "zod";

const catalogValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }).min(3).max(255),
        description: z.string({
            required_error: "Description is required",
        }).min(3).max(255).optional(),
        image: z.string().optional(),
    }),
});

const CatalogValidation = {
    catalogValidationSchema
}
export default CatalogValidation;