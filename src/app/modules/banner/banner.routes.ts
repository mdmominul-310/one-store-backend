import { Router } from "express";
import bannerController from "./banner.controller";

const router: Router = Router();

router.post("/", bannerController.create);
router.get("/", bannerController.findAll);

export { router as bannerRoutes }