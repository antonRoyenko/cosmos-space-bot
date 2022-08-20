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
  setupFeature,
  walletFeature,
  statFeature,
  govFeature,
  resFeature,
  notifFeature,
  assetsFeature,
} from "@bot/features";
import { handleError } from "@bot/helpers/error-handler";
import {
  walletMenu,
  walletRemoveMenu,
  statisticMenu,
  networkMenu,
  notificationMenu,
} from "@bot/menu";
import { reminderDailyMenu } from "@bot/menu/notification/dailyReminder";
import { networksReminderMenu } from "@bot/menu/notification/reminder";
import { networkTimeReminderMenu } from "@bot/menu/notification/reminderTime";
import { timezoneMenu } from "@bot/menu/notification/timezone";
import { alarmMenu } from "@bot/menu/notification/alarm";
import { alarmNetworksMenu } from "@bot/menu/notification/alarmNetworks";
import { governanceMenu } from "@bot/menu/notification/governance";

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
notificationMenu.register(reminderDailyMenu);
notificationMenu.register(alarmMenu);
notificationMenu.register(governanceMenu);
reminderDailyMenu.register(networksReminderMenu);
reminderDailyMenu.register(networkTimeReminderMenu);
reminderDailyMenu.register(timezoneMenu);
alarmMenu.register(alarmNetworksMenu);
bot.use(router);
// Handlers
bot.use(helpFeature);

bot.use(statFeature);
bot.use(botAdminFeature);
bot.use(setupFeature);
bot.use(walletFeature);
bot.use(assetsFeature);
bot.use(govFeature);
bot.use(resFeature);
bot.use(notifFeature);

if (config.isDev) {
  bot.catch(handleError);
}
