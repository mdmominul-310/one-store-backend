import { Schema, model } from "mongoose";
import { AttributeModel, IAttribute, IProducts, ProductModel } from "./products.interface";
import numberOperation from "../../../util/numOperation";


const attributeSchma = new Schema<IAttribute, AttributeModel>({
    name: { type: String },
    enable: { type: Boolean },
    values: [
        {
            title: { type: String },
            label: { type: String }
        }
    ]
})
const productsSchema = new Schema<IProducts, ProductModel>({
    id: { type: String, required: false, default: numberOperation.randomSixDigitNumber() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    categories: [{
        title: { type: String, required: true },
        label: { type: String, required: true },
    }],
    tags: [{
        title: { type: String, required: true },
        label: { type: String, required: true },
    }],
    sku: { type: String, required: false },
    stock: [
        {
            variant: { type: String },
            quantity: { type: String },
            salePrice: { type: String },
            regularPrice: { type: String },
            sku: { type: String }

        }
    ],
    attributes: [attributeSchma],
    isFeatured: { type: Boolean, required: false },
    available: { type: Boolean, required: false, default: true },
    slug: { type: String, required: true },


});
productsSchema.pre<IProducts>("save", function (next) {
    this.id = numberOperation.randomSixDigitNumber().toString();
    next();
})




const Products = model<IProducts, ProductModel>("Products", productsSchema);
export default Products;