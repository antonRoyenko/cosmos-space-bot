import { isUserId } from "grammy-guard";

import { userDao } from "@bot/dao";
import { config } from "@bot/config";
import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { usersService } from "@bot/services";

export const feature = router
  .route("admin")
  .filter(isUserId(config.BOT_ADMIN_USER_ID));

feature
  .filter(isUserId(config.BOT_ADMIN_USER_ID))
  .command("stats", logHandle("handle /stats"), async (ctx) => {
    await ctx.replyWithChatAction("typing");

    const usersCount = await userDao.count();

    const stats = `Users count: ${usersCount}`;

    return ctx.reply(stats);
  });

feature
  .filter(isUserId(config.BOT_ADMIN_USER_ID))
  .command("updates", logHandle("handle updates"), async (ctx) => {
    ctx.session.step = "admin";
    return ctx.reply("Write update message");
  });

feature
  .filter((ctx) => {
    const isAdmin = isUserId(config.BOT_ADMIN_USER_ID);
    return isAdmin(ctx) && ctx.session.step === "admin";
  })
  .on("message:text", async (ctx) => {
    const message = ctx.message.text || "";

    const { getAllUser } = usersService();
    const users = await getAllUser();

    for (const user of users) {
      await ctx.api.sendMessage(Number(user.telegramId), message);
    }
  });

feature
  .filter(isUserId(config.BOT_ADMIN_USER_ID))
  .command("setcommands", logHandle("handle /setcommands"), async (ctx) => {
    await ctx.replyWithChatAction("typing");

    // set private chat admin commands
    await ctx.api.setMyCommands(
      [
        {
          command: "stats",
          description: "Stats",
        },
        {
          command: "setcommands",
          description: "Set bot commands",
        },
      ],
      {
        scope: {
          type: "chat",
          chat_id: config.BOT_ADMIN_USER_ID,
        },
      }
    );

    return ctx.reply("Commands updated");
  });
