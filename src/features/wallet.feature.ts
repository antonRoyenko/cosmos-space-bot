import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { usersService } from "@bot/services";

export const feature = router.route("wallet");

feature.command("wallet", logHandle("handle /wallet"), async (ctx: Context) => {
  if (typeof ctx.from !== "undefined" && Boolean(ctx.from.id)) {
    const user = await usersService.getUserByTelegramId(ctx.from.id);
    console.log(123, user?.wallets);
  }
});
