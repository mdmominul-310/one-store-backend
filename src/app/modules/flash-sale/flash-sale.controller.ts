import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import flashSaleService from "./flash-sale.service";

class FlashSaleController {
    FlashSaleService: typeof flashSaleService;
    Response: typeof responseReturn;

    constructor() {
        this.FlashSaleService = flashSaleService;
        this.Response = responseReturn;
    }

    create = catchAsync(async (req: Request, res: Response) => {
        const data = await this.FlashSaleService.create(req.body);
        this.Response(res, {
            data,
            message: "Flash Sale created successfully",
            success: true,
        })
    });

    getAll = catchAsync(async (req: Request, res: Response) => {
        const { page, limit, search, ...filter } = req.query;
        const pagination = {
            page: page ? parseInt(page as string) : 1,
            limit: limit ? parseInt(limit as string) : 10,
            search: search ? search as string : '',
            filter: filter ? filter : {}
        }
        const data = await this.FlashSaleService.getAll(pagination);
        this.Response(res, {
            data: data.data,
            meta: data.meta,
            message: "All Flash Sales",
            success: true,
        })
    });

    getOne = catchAsync(async (req: Request, res: Response) => {
        const data = await this.FlashSaleService.getOne(req.params.id);
        this.Response(res, {
            data,
            message: "Flash Sale",
            success: true,
        })
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const data = await this.FlashSaleService.update(req.params.id, req.body);
        this.Response(res, {
            data,
            message: "Flash Sale updated successfully",
            success: true,
        })
    });

    delete = catchAsync(async (req: Request, res: Response) => {
        const data = await this.FlashSaleService.delete(req.params.id);
        this.Response(res, {
            data,
            message: "Flash Sale deleted successfully",
            success: true,
        })
    });
}

const flashSaleController = new FlashSaleController();

export default flashSaleController;