import { Router } from "express";
import validateRequest from "../../../middleware/validateRequest";
import CatalogValidation from "../interfaces/catalog.validation";
import colorsController from "./colors.controller";

const router: Router = Router();

router.route('/')
    .post(validateRequest(CatalogValidation.catalogValidationSchema), colorsController.create)
    .get(colorsController.findAll);

router.route('/:id')
    .get(colorsController.findOne)
    .patch(validateRequest(CatalogValidation.catalogValidationSchema), colorsController.update)
    .delete(colorsController.delete);

export { router as colorsRoutes }