import { Model } from "mongoose";

export type IMenus = {
    id?: string;
    name: string;
    icon?: string;
    children: { label: string, icon?: string, title: string }[];
}

export type MenuModel = Model<IMenus>;