import { router } from "@bot/middlewares";
import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { walletMenu } from "@bot/menu";
import { usersService } from "@bot/services";

export const feature = router.route("wallet");

feature.command("wallet", logHandle("handle /wallet"), async (ctx: Context) => {
  ctx.session.step = "wallet";
  await ctx.reply("Choose", { reply_markup: walletMenu });
});

feature
  .filter(
    (ctx) => ctx.session.step === "wallet" || ctx.session.step === "setup"
  )
  .on("message:text", logHandle("handle wallet"), async (ctx) => {
    await ctx.replyWithChatAction("typing");
    const { id: telegramId } = ctx.from;

    const user = await usersService.getUserByTelegramId(telegramId);
    if (user) {
      const wallets = [...new Set([...user.wallets, ctx.message.text])];

      ctx.local.user = await usersService.updateByTelegramId(telegramId, {
        data: { wallets },
      });
    }

    ctx.session.currentWallets = [ctx.message.text];
    ctx.session.step = "home";
    return ctx.reply("Perfect! Now you can use /assets command");
  });
