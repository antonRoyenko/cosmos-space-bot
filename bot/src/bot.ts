import { Bot } from "grammy";
import { limit as rateLimit } from "@grammyjs/ratelimiter";
import { apiThrottler } from "@grammyjs/transformer-throttler";
import { hydrateFiles } from "@grammyjs/files";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";

import { Context } from "@bot/types";
import { config } from "@bot/config";
import { connection as redis } from "./redis";
import {
  updatesLogger,
  setupSession,
  setupLocalContext,
  setupLogger,
  setUser,
  collectMetrics,
  router,
  setupWalletsMigrate,
} from "@bot/middlewares";
import { apiCallsLogger } from "@bot/transformers";
import {
  botAdminFeature,
  helpFeature,
  startFeature,
  walletFeature,
  statisticFeature,
  proposalFeature,
  resourcesFeature,
  notificationFeature,
  assetsFeature,
  aboutFeature,
  supportFeature,
  resetFeature,
} from "@bot/features";
import { handleError } from "@bot/helpers/errorHandler";
import {
  walletMenu,
  walletRemoveMenu,
  networksStatisticMenu,
  notificationMenu,
  dailyReminderMenu,
  alarmMenu,
  proposalMenu,
  networkTimeReminderMenu,
  networksReminderMenu,
  timezoneMenu,
  networksAlarmMenu,
  networksResourcesMenu,
  assetsMenu,
  networksProposalMenu,
} from "@bot/menu";
import { en } from "./constants/en";

export const bot = new Bot<Context>(config.BOT_TOKEN);

// Middlewares

bot.api.config.use(apiThrottler());
bot.api.config.use(hydrateFiles(config.BOT_TOKEN));
bot.api.config.use(parseMode("HTML"));

if (config.isDev) {
  bot.api.config.use(apiCallsLogger);
  bot.use(updatesLogger());
}

// Menus

bot.use(collectMetrics());
bot.use(
  rateLimit({
    timeFrame: 1000,
    storageClient: redis,
    onLimitExceeded: () => {
      console.error("Too many request");
    },
  })
);
bot.use(hydrateReply);
bot.use(setupSession());
bot.use(setupLocalContext());
bot.use(setupLogger());
bot.use(setUser());
bot.use(setupWalletsMigrate());
bot.use(walletMenu);
bot.use(notificationMenu);
bot.use(networksStatisticMenu);
bot.use(networksResourcesMenu);
bot.use(assetsMenu);
bot.use(networksProposalMenu);
walletMenu.register(walletRemoveMenu);
notificationMenu.register(dailyReminderMenu);
notificationMenu.register(alarmMenu);
notificationMenu.register(proposalMenu);
dailyReminderMenu.register(networksReminderMenu);
dailyReminderMenu.register(networkTimeReminderMenu);
dailyReminderMenu.register(timezoneMenu);
alarmMenu.register(networksAlarmMenu);

bot.use(helpFeature);
bot.use(resetFeature);
bot.use(statisticFeature);
bot.use(botAdminFeature);
bot.use(startFeature);
bot.use(walletFeature);
bot.use(assetsFeature);
bot.use(proposalFeature);
bot.use(resourcesFeature);
bot.use(notificationFeature);
bot.use(aboutFeature);
bot.use(supportFeature);

router.otherwise(async (ctx) => await ctx.reply(en.unknownRoute));
bot.use(router);

if (config.isDev) {
  bot.catch(handleError);
}
