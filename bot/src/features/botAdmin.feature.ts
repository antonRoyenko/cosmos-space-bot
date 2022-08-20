import { isUserId } from "grammy-guard";

import { userDao } from "@bot/dao";
import { config } from "@bot/config";
import { getGroupChatCommands } from "@bot/helpers/bot-commands";
import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";

export const feature = router
  .route("wallet")
  .filter(isUserId(config.BOT_ADMIN_USER_ID));

feature.command("stats", logHandle("handle /stats"), async (ctx) => {
  await ctx.replyWithChatAction("typing");

  const usersCount = await userDao.count();

  const stats = `Users count: ${usersCount}`;

  return ctx.reply(stats);
});

feature.command(
  "setcommands",
  logHandle("handle /setcommands"),
  async (ctx) => {
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

    // set group chat commands
    await ctx.api.setMyCommands(getGroupChatCommands(), {
      scope: {
        type: "all_group_chats",
      },
    });

    return ctx.reply("Commands updated");
  }
);
