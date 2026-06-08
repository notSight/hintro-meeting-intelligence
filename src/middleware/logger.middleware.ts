import { Request, Response, NextFunction } from "express";
import logger from "../lib/logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info({
    traceId: req.traceId,
    method: req.method,
    path: req.path,
  });

  next();
};
