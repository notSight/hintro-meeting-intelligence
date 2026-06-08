import express from "express";
import cors from "cors";

import { successResponse } from "./utils/response";
import { traceIdMiddleware } from "./middleware/traceId.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

import authRoutes from "./routes/auth.routes";
import meetingRoutes from "./routes/meeting.routes";
import analysisRoutes from "./routes/analysis.routes";
import actionItemRoutes from "./routes/actionItem.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(traceIdMiddleware);
app.use(loggerMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/meetings", analysisRoutes);
app.use("/api/action-items", actionItemRoutes);

//temporary protected route to test auth middleware, will remove later
import { authenticate } from "./middleware/auth.middleware";

app.get(
  "/protected",
  authenticate,
  (req, res) => {
    res.json(
      successResponse(
        req.traceId || "",
        {
          user: req.user,
        },
        "Protected route accessed"
      )
    );
  }
);



app.get("/", (req, res) => {
  res.json(
    successResponse(
      req.traceId || "",
      {
        service: "Hintro Meeting Intelligence API",
      },
      "API is running"
    )
  );
});

app.use(errorMiddleware);

export default app;