import { Request, Response } from "express";
import catchAsync from "../../../../helpers/catchAsync";
import responseReturn from "../../../../helpers/responseReturn";
import CatalogService from "../interfaces/catalog.service";
import Colors from "./colors.model";

const ColorsService = new CatalogService(Colors);

class ColorsController {
    ColorsService: typeof ColorsService;
    Response: typeof responseReturn;
    constructor() {
        this.ColorsService = ColorsService;
        this.Response = responseReturn;
    }

    create = catchAsync(async (req: Request, res: Response) => {
        const Colors = await this.ColorsService.create(req.body);
        return this.Response(res, {
            success: true,
            message: "Colors created successfully",
            data: Colors,
        });
    });

    findAll = catchAsync(async (req: Request, res: Response) => {
        const categories = await this.ColorsService.findAll();
        return this.Response(res, {
            success: true,
            message: "Colors retrieved successfully",
            data: categories,
        });
    });

    findOne = catchAsync(async (req: Request, res: Response) => {
        const Colors = await this.ColorsService.findOne(req.params.id);
        return this.Response(res, {
            success: true,
            message: "Colors retrieved successfully",
            data: Colors,
        });
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const Colors = await this.ColorsService.update(req.params.id, req.body);
        return this.Response(res, {
            success: true,
            message: "Colors updated successfully",
            data: Colors,
        });
    });

    delete = catchAsync(async (req: Request, res: Response) => {
        const Colors = await this.ColorsService.delete(req.params.id);
        return this.Response(res, {
            success: true,
            message: "Colors deleted successfully",
            data: Colors,
        });
    });

}

const colorsController = new ColorsController();
export default colorsController;