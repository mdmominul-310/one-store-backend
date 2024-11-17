import { Router } from "express";
import validateRequest from "../../../middleware/validateRequest";

import categoryController from "./categories.controller";
import CatalogValidation from "../interfaces/catalog.validation";

const router: Router = Router();

router.route('/')
    .post(validateRequest(CatalogValidation.catalogValidationSchema), categoryController.create)
    .get(categoryController.findAll);

router.route('/:id')
    .get(categoryController.findOne)
    .patch(validateRequest(CatalogValidation.catalogValidationSchema), categoryController.update)
    .delete(categoryController.delete);

export { router as categoriesRoutes }