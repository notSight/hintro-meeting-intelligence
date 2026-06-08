import { Router } from "express";
import {
  createMeetingController,
  getMeetingsController,
  getMeetingByIdController,
} from "../controllers/meeting.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createMeetingSchema } from "../validations/meeting.validation";

const router = Router();

router.use(authenticate);

router.post("/", validate(createMeetingSchema), createMeetingController);
router.get("/", getMeetingsController);
router.get("/:id", getMeetingByIdController);

export default router;
