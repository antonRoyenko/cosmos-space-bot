import { Middleware } from "grammy";

import { Context } from "@bot/types";
import { usersService } from "@bot/services";

export const middleware = (): Middleware<Context> => async (ctx, next) => {
  if (ctx.from?.is_bot === false) {
    const { id: telegramId } = ctx.from;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx.local.user = await usersService.upsertByTelegramId(telegramId);
  }

  return next();
};
