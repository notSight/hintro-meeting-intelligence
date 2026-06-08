import prisma from "../lib/prisma";

export const createMeeting = async (
  data: any,
  userId: string
) => {
  const meeting = await prisma.meeting.create({
    data: {
      title: data.title,
      meetingDate: new Date(data.meetingDate),
      participants: data.participants,
      userId,

      transcript: {
        create: data.transcript,
      },
    },

    include: {
      transcript: true,
    },
  });

  return meeting;
};

export const getMeetings = async (
  page: number,
  limit: number,
  userId: string
) => {
  const meetings = await prisma.meeting.findMany({
    where: {
      userId,
    },

    skip: (page - 1) * limit,
    take: limit,

    orderBy: {
      createdAt: "desc",
    },
  });

  return meetings;
};

export const getMeetingById = async (
  meetingId: string,
  userId: string
) => {
  return prisma.meeting.findFirst({
    where: {
      id: meetingId,
      userId,
    },

    include: {
      transcript: true,
      actionItems: true,
    },
  });
};