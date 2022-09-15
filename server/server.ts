import fastify from "fastify";
import { BotError, webhookCallback } from "grammy";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { register } from "prom-client";
import { bot } from "@bot/bot";
import { config } from "@bot/config";
import { logger } from "@bot/logger";
import { handleError } from "@bot/helpers/errorHandler";
import { networksService, walletsService, usersService } from "@bot/services";
import { bech32 } from "bech32";
import { cron } from "@server/cron";
import { sendNotification } from "@server/telegram";
import path from "path";

export const server = fastify({
  logger,
  trustProxy: true,
});

server.register(fastifyCors, { origin: "*" });

server.register(fastifyStatic, {
  root: path.join(__dirname, "assets"),
  prefix: "/assets/",
});

cron(server);

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
    const { getNetwork } = networksService();
    const { createUserWallet, getAllUserWallets } = walletsService();
    const { getUser } = usersService();
    const telegramId = Number(req.params.id);
    if (isNaN(telegramId)) {
      res.status(500).send({ error: "Please sign in via bot" });
      return;
      // res.status(500).send({ message: "Please sign in via bot" });
    }
    const user = await getUser({ telegramId });
    const userWallets = await getAllUserWallets(user?.id);
    const address = req.body.wallet;
    const name = req.body.name;

    if (userWallets.some((item) => item.address === address)) {
      return req.body;
    }

    const prefix = bech32.decode(address).prefix;
    const { network } = await getNetwork({ name: prefix });

    await createUserWallet({ networkId: network.id, address, name }, user?.id);

    return req.body;
  } catch (err) {
    res.status(500).send(err);
  }
});

server.get<getSendMessage>("/send_message/:id", async (req, res) => {
  try {
    const telegramId = Number(req.params.id);
    const message = "Perfect! Now you can use /assets command";
    await sendNotification(message, "HTML", telegramId);
    return res.status(200);
  } catch (err) {
    res.status(500).send(err);
  }
});
