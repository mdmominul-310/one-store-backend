import { Schema, model } from "mongoose";
import { CatalogModel, ICatalog } from "../interfaces/catalog.interfaces";
import numberOperation from "../../../../util/numOperation";

const sizeSchma = new Schema<ICatalog, CatalogModel>({
    id: {
        type: String,
        required: false,
        default: numberOperation.randomSixDigitNumber()
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Size = model<ICatalog, CatalogModel>("Sizes", sizeSchma);

export default Size;