import fastify from "fastify";
import { BotError, webhookCallback } from "grammy";
import fastifyStatic from "@fastify/static";
import fastifyCors from "@fastify/cors";
import fastifyCron from "fastify-cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { register } from "prom-client";
import { bot } from "@bot/bot";
import { config } from "@bot/config";
import { logger } from "@bot/logger";
import { handleError } from "@bot/helpers/error-handler";
import path from "path";
import { usersService } from "@bot/services";
import { bech32 } from "bech32";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";
import { sendNotification } from "@server/telegram";

export const server = fastify({
  logger,
  trustProxy: true,
});

const DistPath = path.join(__dirname, "..", "web/");

server.register(fastifyStatic, {
  root: DistPath,
});

server.register(fastifyCors, { origin: "*" });

server.register(fastifyCron, {
  jobs: [
    {
      cronTime: "0 * * * *",

      onTick: async () => {
        dayjs.extend(utc);
        dayjs.extend(timezone);
        dayjs.extend(localizedFormat);

        const users = await usersService.getUsers();

        for (const user of users) {
          let prices = "";
          const notification = await usersService.getUserNotification(
            user.notificationId
          );

          if (notification?.timezone) {
            const now = dayjs();
            const userTime = dayjs.tz(now, notification.timezone);
            prices += `Price reminder for ${userTime.format("LLL")} \n\n`;

            for (const network of notification.reminderNetworksIds) {
              const networkPrice = await getTokenPrice(network.name);
              prices += `${network.fullName} - ${networkPrice.price}$ \n`;
            }

            if (
              notification.notificationReminderTime.includes(
                userTime.format("LT")
              )
            ) {
              sendNotification(prices, "HTML", Number(user.telegramId));
            }
          }
        }
      },
    },
  ],
});

server.setNotFoundHandler((_, res) => {
  res.sendFile("index.html");
});

server.setErrorHandler(async (error, request, response) => {
  if (error instanceof BotError) {
    await handleError(error);

    response.code(200).send({});
  } else {
    logger.error(error);

    response.status(500).send({ error: "Something went wrong" });
  }
});

server.post(`/${config.BOT_TOKEN}`, webhookCallback(bot, "fastify"));

server.get("/metrics", async (req, res) => {
  try {
    res.header("Content-Type", register.contentType);
    res.send(await register.metrics());
  } catch (err) {
    res.status(500).send(err);
  }
});

server.post<postWalletRequest>("/update_wallet/:id", async (req, res) => {
  try {
    const telegramId = Number(req.params.id);
    const address = req.body.wallet;
    const prefix = bech32.decode(address).prefix;
    const network = await usersService.getNetwork({ name: prefix });

    if (network && network.id) {
      await usersService.upsertWallet(telegramId, network.id, address);
    }

    return req.body;
  } catch (err) {
    res.status(500).send(err);
  }
});
