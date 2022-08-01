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
import { bech32 } from "bech32";

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
