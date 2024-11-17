import { model, Schema } from "mongoose";
import { FlashSaleModel, IFlashSale } from "./flash-sale.interface";
import numberOperation from "../../../util/numOperation";

const flashSaleSchema = new Schema<IFlashSale, FlashSaleModel>({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    banner: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        }
    ],
    discount: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    }
});

flashSaleSchema.pre<IFlashSale>('save', function (next) {
    if (this.startDate > this.endDate) {
        throw new Error('Start date must be less than end date');
    }
    this.id = 'WF' + numberOperation.randomSixDigitNumber().toString();
    next();
});

const FlashSale = model<IFlashSale, FlashSaleModel>('FlashSale', flashSaleSchema);

export default FlashSale;