import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import responseReturn from "../../../helpers/responseReturn";
import { WishList } from "./wishlist.model";
import catchAsync from "../../../helpers/catchAsync";
import { Request, Response } from "express";

class WishlistController {
  WishList: typeof WishList;
  Response: typeof responseReturn;
  AppError: typeof ApiError;
  HttpStatus: typeof httpStatus;
  constructor() {
    this.WishList = WishList;
    this.Response = responseReturn;
    this.AppError = ApiError;
    this.HttpStatus = httpStatus;
  }

  create = catchAsync(async (req: Request, res: Response) => {
    const isExist = await this.WishList.findOne({
      product: req.body.product,
      user: req.body.user,
    });
    if (isExist) {
      throw new this.AppError(
        this.HttpStatus.BAD_REQUEST,
        "Already in wishlist"
      );
    }
    const wishlist = await this.WishList.create(req.body);
    this.Response(res, {
      data: wishlist,
      message: "Added to wishlist",
      success: true,
    });
  });

  getAll = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const filter: Record<string, unknown> = {};
    if (query) {
      Object.keys(query).forEach((key) => {
        filter[key] = query[key];
      });
    }
    const wishlist = await this.WishList.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);
    this.Response(res, {
      data: wishlist,
      message: "All wishlist",
      success: true,
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const wishlist = await this.WishList.findByIdAndDelete(req.params.id);
    if (!wishlist) {
      throw new this.AppError(this.HttpStatus.NOT_FOUND, "Not found");
    }
    this.Response(res, {
      data: wishlist,
      message: "Removed from wishlist",
      success: true,
    });
  });

  deleteAll = catchAsync(async (req: Request, res: Response) => {
    const wishlist = await this.WishList.deleteMany({ user: req.body.user });
    this.Response(res, {
      data: wishlist,
      message: "Removed all from wishlist",
      success: true,
    });
  });

  getOne = catchAsync(async (req: Request, res: Response) => {
    const wishlist = await this.WishList.findOne({
      product: req.params.id,
      user: req.body.user,
    });
    if (!wishlist) {
      throw new this.AppError(this.HttpStatus.NOT_FOUND, "Not found");
    }
    this.Response(res, {
      data: wishlist,
      message: "Wishlist",
      success: true,
    });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const wishlist = await this.WishList.findOneAndUpdate(
      { product: req.params.id, user: req.body.user },
      req.body,
      { new: true }
    );
    if (!wishlist) {
      throw new this.AppError(this.HttpStatus.NOT_FOUND, "Not found");
    }
    this.Response(res, {
      data: wishlist,
      message: "Updated",
      success: true,
    });
  });
}

const wishlistController = new WishlistController();
export default wishlistController;
