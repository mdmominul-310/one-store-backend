import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import orderService from "./orders.service";

class OrderController {
  OrderService: typeof orderService;
  Response: typeof responseReturn;

  constructor() {
    this.OrderService = orderService;
    this.Response = responseReturn;
  }

  create = catchAsync(async (req: Request, res: Response) => {
    const order = await this.OrderService.create(req.body);
    return this.Response(res, {
      success: true,
      data: order,
      message: "Order created successfully",
    });
  });

  findAll = catchAsync(async (req: Request, res: Response) => {
    const orders = await this.OrderService.findAll(req.query);
    return this.Response(res, {
      success: true,
      data: orders,
      message: "Orders fetched successfully",
    });
  });

  findOne = catchAsync(async (req: Request, res: Response) => {
    const order = await this.OrderService.findOne(req.params.id);
    return this.Response(res, {
      success: true,
      data: order,
      message: "Order fetched successfully",
    });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const order = await this.OrderService.update(req.params.id, req.body);
    return this.Response(res, {
      success: true,
      data: order,
      message: "Order updated successfully",
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const order = await this.OrderService.delete(req.params.id);
    return this.Response(res, {
      success: true,
      data: order,
      message: "Order deleted successfully",
    });
  });
}

const orderController = new OrderController();
export default orderController;
