import { Model } from "mongoose";

export interface ICatalog {
    _id?: string;
    id?: string;
    name: string;
    description: string;
    image: string;
}

export type CatalogModel = Model<ICatalog>;
