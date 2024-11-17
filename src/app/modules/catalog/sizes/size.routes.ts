import { Router } from "express";
import validateRequest from "../../../middleware/validateRequest";
import CatalogValidation from "../interfaces/catalog.validation";
import sizeController from "./size.controller";

const router: Router = Router();

router.route('/')
    .post(validateRequest(CatalogValidation.catalogValidationSchema), sizeController.create)
    .get(sizeController.findAll);

router.route('/:id')
    .get(sizeController.findOne)
    .patch(validateRequest(CatalogValidation.catalogValidationSchema), sizeController.update)
    .delete(sizeController.delete);

export { router as sizesRoutes }