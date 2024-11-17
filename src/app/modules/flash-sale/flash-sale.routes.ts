import { Router } from "express";
import flashSaleController from "./flash-sale.controller";

const router: Router = Router();

router.route('/')
    .post(flashSaleController.create)
    .get(flashSaleController.getAll);

router.route('/:id')
    .get(flashSaleController.getOne)
    .patch(flashSaleController.update)
    .delete(flashSaleController.delete);



export { router as flashSaleRoutes }