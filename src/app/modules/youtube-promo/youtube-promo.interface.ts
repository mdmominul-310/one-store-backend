import { Model } from "mongoose";

export type IYoutubePromo = {
    title: string;
    id?: string;
    description?: string;
    url: string;
    thumbnail?: string;
};

export type YoutubePromoModel = Model<IYoutubePromo>;