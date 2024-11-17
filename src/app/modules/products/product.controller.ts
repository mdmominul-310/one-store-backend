import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import productService from "./products.service";
import { IPaginatinQuery } from "../../../interfaces/common";

class ProductController {
    productService: typeof productService;
    Response: typeof responseReturn;

    constructor() {
        this.productService = productService;
        this.Response = responseReturn;
    }

    create = catchAsync(async (req: Request, res: Response) => {
        const product = await this.productService.create(req.body);
        this.Response(res, {
            success: true,
            message: "Product created successfully",
            data: product,
        });
    });

    findAll = catchAsync(async (req: Request, res: Response) => {
        const { page, limit, search, ...filter } = req.query;
        const paginationQuery: IPaginatinQuery = {
            page: page ? parseInt(page as string) : 1,
            limit: limit ? parseInt(limit as string) : 10,
            search: search ? search as string : "",
            filter: filter as Record<string, string>,
        };
        const products = await this.productService.findAll(paginationQuery);
        this.Response(res, {
            success: true,
            message: "Products retrieved successfully",
            data: products.data,
            meta: products.meta,
        });
    });

    findOne = catchAsync(async (req: Request, res: Response) => {
        const product = await this.productService.findOne(req.params.id);
        this.Response(res, {
            success: true,
            message: "Product retrieved successfully",
            data: product,
        });
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const product = await this.productService.update(req.params.id, req.body);
        this.Response(res, {
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    });

    delete = catchAsync(async (req: Request, res: Response) => {
        const product = await this.productService.delete(req.params.id);
        this.Response(res, {
            success: true,
            message: "Product deleted successfully",
            data: product,
        });
    });

    findBySlug = catchAsync(async (req: Request, res: Response) => {
        const product = await this.productService.findBySlug(req.params.slug);
        this.Response(res, {
            success: true,
            message: "Product retrieved successfully",
            data: product,
        });
    });
}

const productController = new ProductController();
export default productController;