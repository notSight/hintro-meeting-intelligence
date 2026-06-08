import { Request, Response, NextFunction } from "express";

import {
  createMeeting,
  getMeetings,
  getMeetingById,
} from "../services/meeting.service";

import { successResponse } from "../utils/response";

import ApiError from "../utils/ApiError";

export const createMeetingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const meeting = await createMeeting(
      req.body,
      req.user.userId
    );

    res.status(201).json(
      successResponse(
        req.traceId || "",
        meeting,
        "Meeting created successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getMeetingsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const meetings = await getMeetings(
      page,
      limit,
      req.user.userId
    );

    res.json(
      successResponse(
        req.traceId || "",
        meetings,
        "Meetings fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getMeetingByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      throw new ApiError(
        400,
        "INVALID_MEETING_ID",
        "Meeting id is required"
      );
    }

    const meeting = await getMeetingById(
      id,
      req.user.userId
    );

    if (!meeting) {
      throw new ApiError(
        404,
        "MEETING_NOT_FOUND",
        "Meeting not found"
      );
    }

    res.json(
      successResponse(
        req.traceId || "",
        meeting,
        "Meeting fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};