import { Middleware, session } from "grammy";
import { RedisAdapter } from "@grammyjs/storage-redis";

import { connection } from "@bot/redis";
import { Context } from "@bot/types";

const storage = new RedisAdapter({
  instance: connection,
});

export const middleware = (): Middleware<Context> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  session({
    initial: () => ({}),
    storage,
  });
