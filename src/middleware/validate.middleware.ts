import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import ApiError from "../utils/ApiError";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(
        400,
        "VALIDATION_ERROR",
        result.error.issues[0].message
      );
    }

    req.body = result.data;

    next();
  };