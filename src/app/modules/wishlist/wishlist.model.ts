import { model, Schema } from "mongoose";
import { IWishList, WishListModel } from "./wishlist.interface";

const wishListSchema = new Schema<IWishList, WishListModel>(
  {
    product: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

wishListSchema.pre("save", function (next) {
  this.id = this._id;
  next();
});

export const WishList = model<IWishList, WishListModel>(
  "WishList",
  wishListSchema
);
