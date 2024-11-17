import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import menuService from "./menus.service";

class MenuController {
    MenuService: typeof menuService;
    Response: typeof responseReturn;

    constructor() {
        this.MenuService = menuService;
        this.Response = responseReturn;
    }

    create = catchAsync(async (req: Request, res: Response) => {
        const menu = await this.MenuService.create(req.body);
        return this.Response(res, {
            success: true,
            data: menu,
            message: "Menu created successfully",
        });
    });

    findAll = catchAsync(async (req: Request, res: Response) => {
        const menus = await this.MenuService.findAll();
        return this.Response(res, {
            success: true,
            data: menus,
            message: "Menus fetched successfully",
        });
    });

    findOne = catchAsync(async (req: Request, res: Response) => {
        const menu = await this.MenuService.findOne(req.params.id);
        return this.Response(res, {
            success: true,
            data: menu,
            message: "Menu fetched successfully",
        });
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const menu = await this.MenuService.update(req.params.id, req.body);
        return this.Response(res, {
            success: true,
            data: menu,
            message: "Menu updated successfully",
        });
    });

    delete = catchAsync(async (req: Request, res: Response) => {
        const menu = await this.MenuService.delete(req.params.id);
        return this.Response(res, {
            success: true,
            data: menu,
            message: "Menu deleted successfully",
        });
    });

    deleteAll = catchAsync(async (req: Request, res: Response) => {
        const menus = await this.MenuService.deleteAll();
        return this.Response(res, {
            success: true,
            data: menus,
            message: "Menus deleted successfully",
        });
    });
}

const menuController = new MenuController();
export default menuController;
