import { Model } from "mongoose";

export type IFlashSale = {
    title: string;
    id: string;
    description?: string;
    banner: string;
    startDate: Date;
    endDate: Date;
    status: boolean;
    products: Array<string>;
    discount: number;
    featured: boolean;
}


export type FlashSaleModel = Model<IFlashSale>;