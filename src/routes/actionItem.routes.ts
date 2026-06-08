import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { updateActionItemSchema } from "../validations/actionItem.validation";
import {
  getActionItemsController,
  updateActionItemController,
  getOverdueActionItemsController,
} from "../controllers/actionItem.controller";

const router = Router();

router.use(authenticate);

router.get("/", getActionItemsController);
router.get("/overdue", getOverdueActionItemsController);
router.patch(
  "/:id",
  validate(updateActionItemSchema),
  updateActionItemController,
);

export default router;
