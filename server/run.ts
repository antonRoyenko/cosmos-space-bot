import "module-alias/register";

import { bot } from "@bot/bot";
import { server } from "@server/server";
import { prisma } from "@server/prisma";
import { config } from "@bot/config";
import { logger } from "@bot/logger";
import { handleGracefulShutdown } from "@bot/helpers/graceful-shutdown-handler";

// Graceful shutdown
prisma.$on("beforeExit", handleGracefulShutdown);

const run = async () => {
  console.log(1111, config.isProd);
  if (config.isProd) {
    server.listen({ port: config.PORT, host: config.BOT_SERVER_HOST }, () => {
      bot.api
        .setWebhook(config.BOT_WEBHOOK, {
          allowed_updates: config.BOT_ALLOWED_UPDATES,
        })
        .catch((err) => logger.error(err));
    });
  } else {
    server.listen({ host: config.BOT_SERVER_HOST, port: 3000 }, (err) => {
      if (err) throw err;
      server.cron.startAllJobs();
      console.log("Server listening on http://localhost:3000");
    });

    bot.start({
      allowed_updates: config.BOT_ALLOWED_UPDATES,
      onStart: ({ username }) =>
        logger.info({
          msg: "bot running...",
          username,
        }),
    });
  }
};
run();
