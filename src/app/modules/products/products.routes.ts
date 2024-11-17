import { Router } from "express";
import productController from "./product.controller";
import validateRequest from "../../middleware/validateRequest";
import ProductsValidation from "./products.validation";

const router: Router = Router();

router.route("/")
    .post(validateRequest(ProductsValidation.productsValicationSchema), productController.create)
    .get(productController.findAll);

router.route("/:id")
    .get(productController.findOne)
    .patch(validateRequest(ProductsValidation.productsValicationSchema), productController.update)
    .delete(productController.delete);

router.route("/slug/:slug")
    .get(productController.findBySlug);

export { router as productRoutes }

