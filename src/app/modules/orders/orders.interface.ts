import { Model } from "mongoose";

export type ICarts = {
    id: string,
    title: string,
    price: number
    regularPrice: number
    image: string,
    qty: number,
    selected?: boolean,
    attributes?: { [key: string]: string; }[]
}

export type IOrders = {
    id?: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    deliveryArea: string;
    note: string;
    products: ICarts[];
    status: string;
    total: string;
    deliveryCharge: string;
}

export type OrdersModel = Model<IOrders>;