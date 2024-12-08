import { Model } from "mongoose";

export type IWishList = {
  product: string;
  user: string;
  createdAt?: string;
  updatedAt?: string;
  id: string;
};

export type WishListModel = Model<IWishList>;
