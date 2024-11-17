import ApiError from "../../../errors/ApiError";
import { IMenus } from "./menus.interface";
import Menus from "./menus.model";
import { DeleteResult } from "mongodb";

class MenuService {
    Menu: typeof Menus;
    ApiError: typeof ApiError;

    constructor() {
        this.Menu = Menus;
        this.ApiError = ApiError;
    }

    async create(payload: IMenus): Promise<IMenus> {
        const isExist = await this.Menu.findOne({ name: payload.name });
        if (isExist) throw new this.ApiError(400, "Menu Item already exist");
        const menu = await this.Menu.create(payload);
        return menu;
    }

    async findAll(): Promise<IMenus[]> {
        const menus = await this.Menu.find();
        return menus;
    }

    async findOne(id: string): Promise<IMenus> {
        const menu = await this.Menu.findById(id);
        if (!menu) throw new this.ApiError(404, "Menu Item not found");
        return menu;
    }

    async update(id: string, payload: IMenus): Promise<IMenus | null> {
        const menu = await this.Menu.findById(id);
        if (!menu) throw new this.ApiError(404, "Menu Item not found");
        const updatedMenu = await this.Menu.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedMenu;
    }

    async delete(id: string): Promise<IMenus | null> {
        const menu = await this.Menu.findById(id);
        if (!menu) throw new this.ApiError(404, "Menu Item not found");
        await this.Menu.findByIdAndDelete(id);
        return menu;
    }

    async deleteAll(): Promise<DeleteResult> {
        const menus = await this.Menu.deleteMany({});
        return menus;
    }
}

const menuService = new MenuService();
export default menuService;
