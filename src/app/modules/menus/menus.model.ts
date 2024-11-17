import { Schema, model } from "mongoose";
import { IMenus, MenuModel } from "./menus.interface";
import numberOperation from "../../../util/numOperation";

const menusSchema = new Schema<IMenus, MenuModel>({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: false
    },
    icon: {
        type: String
    },
    children: {
        type: [{
            label: {
                type: String,
                required: true
            },
            icon: {
                type: String
            },
            title: {
                type: String,
                required: true
            }
        }]
    }
});

menusSchema.pre<IMenus>('save', function (next) {
    this.id = "WM" + numberOperation.randomSixDigitNumber().toString() as string;
    next();
});

const Menus = model<IMenus, MenuModel>('Menus', menusSchema);
export default Menus;