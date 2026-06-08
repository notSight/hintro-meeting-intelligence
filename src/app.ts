import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Hintro Meeting Intelligence API"
  });
});

app.get("/test-db", async (_req, res) => {
  res.json({
    success: true,
    message: "Database connected"
  });
});

export default app;