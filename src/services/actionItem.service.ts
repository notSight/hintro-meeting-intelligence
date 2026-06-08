import prisma from "../lib/prisma";

import ApiError from "../utils/ApiError";

export const saveActionItems = async (
  meetingId: string,
  items: any[]
) => {
  for (const item of items) {
    await prisma.actionItem.create({
      data: {
        task: item.task,
        assignee: item.assignee,
        meetingId,
      },
    });
  }
};

export const getActionItems = async (
  userId: string,
  status?: string
) => {
  return prisma.actionItem.findMany({
    where: {
      ...(status ? { status: status as any } : {}),

      meeting: {
        userId,
      },
    },

    include: {
      meeting: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateActionItemStatus = async (
  actionItemId: string,
  status: any,
  userId: string
) => {
  const actionItem =
    await prisma.actionItem.findFirst({
      where: {
        id: actionItemId,

        meeting: {
          userId,
        },
      },
    });

  if (!actionItem) {
    throw new ApiError(
      404,
      "ACTION_ITEM_NOT_FOUND",
      "Action item not found"
    );
  }

  return prisma.actionItem.update({
    where: {
      id: actionItemId,
    },

    data: {
      status,
    },
  });
};

export const getOverdueActionItems = async (
  userId: string
) => {
  return prisma.actionItem.findMany({
    where: {
      status: {
        not: "COMPLETED",
      },

      dueDate: {
        lt: new Date(),
      },

      meeting: {
        userId,
      },
    },

    include: {
      meeting: true,
    },
  });
};