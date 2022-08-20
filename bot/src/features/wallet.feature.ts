import { router } from "@bot/middlewares";
import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { walletMenu } from "@bot/menu";
import { networksService, walletsService } from "@bot/services";
import { bech32 } from "bech32";
import { agreementKeyboard } from "@bot/menu/util";

export const feature = router.route("wallet");

feature.command("wallet", logHandle("handle /wallet"), async (ctx: Context) => {
  ctx.session.step = "walletMenu";
  await ctx.reply("Choose", { reply_markup: walletMenu });
});

feature
  .filter((ctx) => ctx.session.step === "wallet")
  .on("message:text", logHandle("handle wallet"), async (ctx) => {
    await ctx.replyWithChatAction("typing");
    const { getNetwork } = networksService();
    const { createUserWallet, getAllUserWallets } = walletsService(ctx);

    const address = ctx.message.text;

    if (address.startsWith("/")) {
      return;
    }

    const prefix = bech32.decode(address).prefix;
    const network = await getNetwork({ name: prefix });
    const userWallets = await getAllUserWallets();

    if (userWallets.some((walelt) => walelt.address === address)) {
      return ctx.reply("You already have this wallet");
    }

    if (network) {
      await createUserWallet(network.id, address);
    }

    await ctx.reply(`Do you want add more ?`, {
      reply_markup: agreementKeyboard,
    });
  });

feature.callbackQuery("yes", async (ctx) => {
  await ctx.reply(`Add one more price alarm`);
});

feature.callbackQuery("no", async (ctx) => {
  ctx.session.step = "home";
  return ctx.reply("Perfect! Now you can use /assets command");
});
