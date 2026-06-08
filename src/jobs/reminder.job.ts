import cron from "node-cron";

import prisma from "../lib/prisma";

import { sendTelegramMessage } from "../services/telegram.service";

cron.schedule("*/1 * * * *", async () => {
  console.log("Running reminder job...");

  const overdueItems = await prisma.actionItem.findMany({
    where: {
      status: {
        not: "COMPLETED",
      },

      dueDate: {
        lt: new Date(),
      },
    },

    include: {
      reminders: true,
    },
  });

  for (const item of overdueItems) {
    const alreadySentToday = item.reminders.some((reminder) => {
      const today = new Date();

      return reminder.sentAt.toDateString() === today.toDateString();
    });

    if (alreadySentToday) {
      continue;
    }

    const message = `
Overdue Action Item

Task: ${item.task}
Assignee: ${item.assignee}
Status: ${item.status}
`;

    await sendTelegramMessage(message);

    await prisma.reminderHistory.create({
      data: {
        actionItemId: item.id,
        channel: "TELEGRAM",
      },
    });

    console.log(`Reminder sent for task ${item.id}`);
  }
});
