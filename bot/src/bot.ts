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
} from "@bot/features";
import { handleError } from "@bot/helpers/error-handler";
import {
  walletMenu,
  walletRemoveMenu,
  statisticMenu,
  networkMenu,
  notificationMenu,
  dailyReminderMenu,
  alarmMenu,
  proposalMenu,
  networkTimeReminderMenu,
  networksReminderMenu,
  timezoneMenu,
  networksAlarmMenu,
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
statisticMenu.register(networkMenu);
walletMenu.register(walletRemoveMenu);
notificationMenu.register(dailyReminderMenu);
notificationMenu.register(alarmMenu);
notificationMenu.register(proposalMenu);
dailyReminderMenu.register(networksReminderMenu);
dailyReminderMenu.register(networkTimeReminderMenu);
dailyReminderMenu.register(timezoneMenu);
alarmMenu.register(networksAlarmMenu);
bot.use(router);
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

if (config.isDev) {
  bot.catch(handleError);
}
