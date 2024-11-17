import { Router } from "express";
import youtubePromoController from "./youtube-promo.controller";

const router: Router = Router();

router.route("/")
    .get(youtubePromoController.get)
    .post(youtubePromoController.create);

router.route("/:id")
    .patch(youtubePromoController.update)
    .delete(youtubePromoController.delete);

export { router as youtubePromoRoutes }