import { z } from "zod";

const productsValicationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }).min(3).max(255),
        description: z.string({
            required_error: "Description is required"
        }).min(3),
        stock: z.array(z.object({
            variant: z.string().min(1),
            quantity: z.string().min(1),
            salePrice: z.string().min(1),
            regularPrice: z.string().min(1),
            sku: z.string().min(1)
        })).min(1),
        images: z.array(z.string()).min(1),
        categories: z.array(
            z.object({
                title: z.string().min(1),
                label: z.string().min(1)
            })
        ).min(1),
        tags: z.array(
            z.object({
                title: z.string().min(1),
                label: z.string().min(1)
            })
        ).min(1),
        sku: z.string().optional(),
        isFeatured: z.boolean().optional(),
        slug: z.string({
            required_error: "Slug is required"
        }).optional(),




    })
});

const ProductsValidation = {
    productsValicationSchema
}

export default ProductsValidation;