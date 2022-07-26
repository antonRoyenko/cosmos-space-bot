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
import { usersService } from "@bot/services";

export const server = fastify({
  logger,
});

const DistPath = path.join(__dirname, "..", "web/");

server.register(fastifyStatic, {
  root: DistPath,
});

server.register(fastifyCors, { origin: "*" });

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
    const wallet = req.body.wallet;
    const user = await usersService.getUserByTelegramId(telegramId);
    if (user) {
      const wallets = [...new Set([...user.wallets, wallet])];
      await usersService.updateByTelegramId(telegramId, {
        data: { wallets },
      });
    }

    return req.body;
  } catch (err) {
    res.status(500).send(err);
  }
});
