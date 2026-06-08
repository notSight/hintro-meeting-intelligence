import { Request, Response, NextFunction } from "express";

import {
  getActionItems,
  updateActionItemStatus,
  getOverdueActionItems,
} from "../services/actionItem.service";

import { successResponse } from "../utils/response";

export const getActionItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const items = await getActionItems(
      req.user.userId,
      req.query.status as string,
    );

    res.json(
      successResponse(
        req.traceId || "",
        items,
        "Action items fetched successfully",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const updateActionItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      throw new Error("Missing action item id");
    }

    const item = await updateActionItemStatus(
      id,
      req.body.status,
      req.user.userId,
    );

    res.json(
      successResponse(
        req.traceId || "",
        item,
        "Action item updated successfully",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const getOverdueActionItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const items = await getOverdueActionItems(req.user.userId);

    res.json(
      successResponse(
        req.traceId || "",
        items,
        "Overdue action items fetched successfully",
      ),
    );
  } catch (error) {
    next(error);
  }
};
