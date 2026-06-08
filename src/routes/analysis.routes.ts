import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { analyzeMeetingController } from "../controllers/analysis.controller";

const router = Router();

router.use(authenticate);

router.post("/:id/analyze", analyzeMeetingController);

export default router;
