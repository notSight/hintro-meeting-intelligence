import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export const traceIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const traceId = req.headers["x-trace-id"] || uuidv4();

  req.traceId = traceId as string;

  res.setHeader("x-trace-id", String(traceId));
  next();
};
