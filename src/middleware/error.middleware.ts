import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import { errorResponse } from "../utils/response";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(
      errorResponse(
        req.traceId || "",
        err.code,
        err.message
      )
    );
  }

  return res.status(500).json(
    errorResponse(
      req.traceId || "",
      "INTERNAL_SERVER_ERROR",
      "Something went wrong"
    )
  );
};