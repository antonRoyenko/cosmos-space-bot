import { Bot } from "grammy";
import { limit as rateLimit } from "@grammyjs/ratelimiter";
import { apiThrottler } from "@grammyjs/transformer-throttler";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";

import { Context } from "@bot/types";
import { config } from "@bot/config";
import {
  updatesLogger,
  setupSession,
  setupLocalContext,
  setupLogger,
  setUser,
  collectMetrics,
  router,
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
  // unknownFeature,
} from "@bot/features";
import { handleError } from "@bot/helpers/error-handler";
import {
  walletMenu,
  walletRemoveMenu,
  statisticMenu,
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
} from "@bot/menu";

export const bot = new Bot<Context>(config.BOT_TOKEN);

// Middlewares

bot.api.config.use(apiThrottler());
bot.api.config.use(parseMode("HTML"));

if (config.isDev) {
  bot.api.config.use(apiCallsLogger);
  bot.use(updatesLogger());
}

// getClient("https://gql.desmos.forbole.com/v1/graphql");

bot.use(collectMetrics());
bot.use(rateLimit());
bot.use(hydrateReply);
bot.use(setupSession());
bot.use(setupLocalContext());
bot.use(setupLogger());
bot.use(setUser());
bot.use(walletMenu);
bot.use(statisticMenu);
bot.use(notificationMenu);
bot.use(networksResourcesMenu);
statisticMenu.register(networksStatisticMenu);
walletMenu.register(walletRemoveMenu);
notificationMenu.register(dailyReminderMenu);
notificationMenu.register(alarmMenu);
notificationMenu.register(proposalMenu);
dailyReminderMenu.register(networksReminderMenu);
dailyReminderMenu.register(networkTimeReminderMenu);
dailyReminderMenu.register(timezoneMenu);
alarmMenu.register(networksAlarmMenu);

// Handlers
bot.use(helpFeature);

bot.use(statisticFeature);
bot.use(botAdminFeature);
bot.use(startFeature);
bot.use(walletFeature);
bot.use(assetsFeature);
bot.use(proposalFeature);
bot.use(resourcesFeature);
bot.use(notificationFeature);

router.otherwise(
  async (ctx) =>
    await ctx.reply(
      "Sorry, I don't understand you, please use /help for description command"
    )
);
bot.use(router);

if (config.isDev) {
  bot.catch(handleError);
}
