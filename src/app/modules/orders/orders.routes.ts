import { Router } from "express";
import orderController from "./orders.controller";

const roter: Router = Router();
roter.route("/")
    .post(orderController.create)
    .get(orderController.findAll);

roter.route("/:id")
    .get(orderController.findOne)
    .patch(orderController.update)
    .delete(orderController.delete);
export { roter as orderRoutes }