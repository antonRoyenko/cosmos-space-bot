import fastify from "fastify";
import { BotError, webhookCallback } from "grammy";
import fastifyStatic from "@fastify/static";
import fastifyCors from "@fastify/cors";
import { register } from "prom-client";
import { bot } from "@bot/bot";
import { config } from "@bot/config";
import { logger } from "@bot/logger";
import { handleError } from "@bot/helpers/error-handler";
import path from "path";
import { networksService, walletsService, usersService } from "@bot/services";
import { bech32 } from "bech32";
import { cron } from "@server/cron";
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

cron(server);

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
    const { getNetwork } = networksService();
    const { createUserWallet } = walletsService();
    const { getUser } = usersService();
    const telegramId = Number(req.params.id);
    const user = await getUser({ telegramId });
    const address = req.body.wallet;
    const prefix = bech32.decode(address).prefix;
    const { network } = await getNetwork({ name: prefix });

    await createUserWallet(network.id, address, user?.id);

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
