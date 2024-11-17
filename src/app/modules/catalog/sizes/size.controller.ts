import { Request, Response } from "express";
import catchAsync from "../../../../helpers/catchAsync";
import responseReturn from "../../../../helpers/responseReturn";
import CatalogService from "../interfaces/catalog.service";
import Size from "./size.model";

const SizeService = new CatalogService(Size);

class SizeController {
    SizeService: typeof SizeService;
    Response: typeof responseReturn;
    constructor() {
        this.SizeService = SizeService;
        this.Response = responseReturn;
    }

    create = catchAsync(async (req: Request, res: Response) => {
        const Size = await this.SizeService.create(req.body);
        return this.Response(res, {
            success: true,
            message: "Size created successfully",
            data: Size,
        });
    });

    findAll = catchAsync(async (req: Request, res: Response) => {
        const categories = await this.SizeService.findAll();
        return this.Response(res, {
            success: true,
            message: "size retrieved successfully",
            data: categories,
        });
    });

    findOne = catchAsync(async (req: Request, res: Response) => {
        const Size = await this.SizeService.findOne(req.params.id);
        return this.Response(res, {
            success: true,
            message: "Size retrieved successfully",
            data: Size,
        });
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const Size = await this.SizeService.update(req.params.id, req.body);
        return this.Response(res, {
            success: true,
            message: "Size updated successfully",
            data: Size,
        });
    });

    delete = catchAsync(async (req: Request, res: Response) => {
        const Size = await this.SizeService.delete(req.params.id);
        return this.Response(res, {
            success: true,
            message: "Size deleted successfully",
            data: Size,
        });
    });

}

const sizeController = new SizeController();
export default sizeController;