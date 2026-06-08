import { Request, Response, NextFunction } from "express";

import {
  registerUser,
  loginUser,
} from "../services/auth.service";

import { successResponse } from "../utils/response";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerUser(
      req.body.email,
      req.body.password
    );

    res.status(201).json(
      successResponse(
        req.traceId || "",
        user,
        "User registered successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await loginUser(
      req.body.email,
      req.body.password
    );

    res.status(200).json(
      successResponse(
        req.traceId || "",
        data,
        "Login successful"
      )
    );
  } catch (error) {
    next(error);
  }
};