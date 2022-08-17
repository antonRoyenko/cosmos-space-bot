import { router } from "@bot/middlewares";
import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { walletMenu } from "@bot/menu";
import { usersService } from "@bot/services";
import { bech32 } from "bech32";

export const feature = router.route("wallet");

feature.command("wallet", logHandle("handle /wallet"), async (ctx: Context) => {
  ctx.session.step = "walletMenu";
  await ctx.reply("Choose", { reply_markup: walletMenu });
});

feature
  .filter(
    (ctx) => ctx.session.step === "wallet" || ctx.session.step === "setup"
  )
  .on("message:text", logHandle("handle wallet"), async (ctx) => {
    await ctx.replyWithChatAction("typing");
    const { id: telegramId } = ctx.from;

    const address = ctx.message.text;

    if (address.startsWith("/")) {
      return;
    }

    const prefix = bech32.decode(address).prefix;
    const network = await usersService.getNetwork({ name: prefix });
    const userWallets = await usersService.getUserWallets(telegramId);
    const user = await usersService.getUserByTelegramId({
      telegramId: telegramId,
    });

    if (userWallets.some((walelt) => walelt.address === address)) {
      return ctx.reply("You already have this wallet");
    }

    if (network && user) {
      const wallet = await usersService.upsertWallet(
        user.id,
        network.id,
        address
      );

      ctx.session.currentWallets = [...userWallets, wallet];
    }

    ctx.session.step = "home";
    return ctx.reply("Perfect! Now you can use /assets command");
  });
