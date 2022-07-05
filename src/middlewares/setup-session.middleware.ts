import { Middleware, session } from "grammy";
import { RedisAdapter } from "@grammyjs/storage-redis";

import { connection } from "@bot/redis";
import { Context } from "@bot/types";

const storage = new RedisAdapter({
  instance: connection,
});

export const middleware = (): Middleware<Context> =>
  session({
    initial: () => ({ currencyMenu: undefined, step: "setup" }),
    storage,
  });
