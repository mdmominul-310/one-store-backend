import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../../enum/user";
import wishlistController from "./wishlist.controller";

const router: Router = Router();
router
  .route("/")
  .get(auth(USER_ROLE.USER), wishlistController.getAll)
  .post(auth(USER_ROLE.USER), wishlistController.create);

router
  .route("/:id")
  .delete(auth(USER_ROLE.USER), wishlistController.delete)
  .patch(auth(USER_ROLE.USER), wishlistController.update)
  .get(auth(USER_ROLE.USER), wishlistController.getOne);

export { router as wishlistRouter };
