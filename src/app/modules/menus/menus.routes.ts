import { Router } from "express";
import menuController from "./menus.controller";

const router: Router = Router();
router.route("/")
    .post(menuController.create)
    .get(menuController.findAll);

router.route("/:id")
    .get(menuController.findOne)
    .patch(menuController.update)
    .delete(menuController.delete);


export { router as menuRoutes };