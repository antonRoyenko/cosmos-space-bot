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
} from "@bot/features";
import { handleError } from "@bot/helpers/error-handler";
import { currentMenu } from "@bot/menu";

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
bot.use(currentMenu);
bot.use(router);
// Handlers

bot.use(helpFeature);
bot.use(statFeature);
bot.use(botAdminFeature);
bot.use(setupFeature);
bot.use(walletFeature);
bot.use(govFeature);
bot.use(resFeature);
bot.use(notifFeature);

if (config.isDev) {
  bot.catch(handleError);
}
