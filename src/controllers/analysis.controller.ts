import { Request, Response, NextFunction } from "express";

import prisma from "../lib/prisma";

import { analyzeTranscript } from "../services/ai.service";

import { successResponse } from "../utils/response";

import ApiError from "../utils/ApiError";

export const analyzeMeetingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const meetingId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const meeting = await prisma.meeting.findFirst({
      where: {
        id: meetingId,
        userId: req.user.userId,
      },

      include: {
        transcript: true,
      },
    });

    if (!meeting) {
      throw new ApiError(
        404,
        "MEETING_NOT_FOUND",
        "Meeting not found"
      );
    }

    const analysis = await analyzeTranscript(
      meeting.transcript
    );

    res.json(
      successResponse(
        req.traceId || "",
        analysis,
        "Meeting analyzed successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};