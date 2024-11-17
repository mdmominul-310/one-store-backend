import { Request, Response } from "express";
import catchAsync from "../../../../helpers/catchAsync";
import responseReturn from "../../../../helpers/responseReturn";
// import categoryService from "./categories.service";
import CatalogService from "../interfaces/catalog.service";
import Category from "./categories.model";

const categoryService = new CatalogService(Category);

class CategoryController {
    categoryService: typeof categoryService;
    Response: typeof responseReturn;
    constructor() {
        this.categoryService = categoryService;
        this.Response = responseReturn;
    }

    create = catchAsync(async (req: Request, res: Response) => {
        const category = await this.categoryService.create(req.body);
        return this.Response(res, {
            success: true,
            message: "Category created successfully",
            data: category,
        });
    });

    findAll = catchAsync(async (req: Request, res: Response) => {
        const categories = await this.categoryService.findAll();
        return this.Response(res, {
            success: true,
            message: "Categories retrieved successfully",
            data: categories,
        });
    });

    findOne = catchAsync(async (req: Request, res: Response) => {
        const category = await this.categoryService.findOne(req.params.id);
        return this.Response(res, {
            success: true,
            message: "Category retrieved successfully",
            data: category,
        });
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const category = await this.categoryService.update(req.params.id, req.body);
        return this.Response(res, {
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    });

    delete = catchAsync(async (req: Request, res: Response) => {
        const category = await this.categoryService.delete(req.params.id);
        return this.Response(res, {
            success: true,
            message: "Category deleted successfully",
            data: category,
        });
    });

}

const categoryController = new CategoryController();
export default categoryController;