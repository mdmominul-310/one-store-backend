import { Schema, model } from "mongoose";
import { IOrders, OrdersModel } from "./orders.interface";
import numberOperation from "../../../util/numOperation";

const ordersSchema = new Schema<IOrders, OrdersModel>(
  {
    id: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    deliveryArea: {
      type: String,
      required: true,
    },
    deliveryCharge: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    products: [
      {
        id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        regularPrice: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        attributes: {
          type: [
            {
              key: {
                type: String,
                required: true,
              },
              value: {
                type: String,
                required: true,
              },
            },
          ],
          required: false,
        },
      },
    ],
    status: {
      type: String,
      required: false,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
ordersSchema.pre<IOrders>("save", function (next) {
  this.id = "WA" + numberOperation.randomSixDigitNumber().toString();
  next();
});
const Orders = model<IOrders, OrdersModel>("Orders", ordersSchema);

export default Orders;
