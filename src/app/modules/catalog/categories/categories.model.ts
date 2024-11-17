import { Schema, model } from "mongoose";
import { CatalogModel, ICatalog } from "../interfaces/catalog.interfaces";
import numberOperation from "../../../../util/numOperation";

const categorySchema = new Schema<ICatalog, CatalogModel>({
    id: { type: String, required: false, default: numberOperation.randomSixDigitNumber() },
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

const Category = model<ICatalog, CatalogModel>("Category", categorySchema);

export default Category;