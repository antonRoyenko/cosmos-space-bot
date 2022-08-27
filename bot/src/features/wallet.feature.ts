import { router } from "@bot/middlewares";
import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { walletMenu } from "@bot/menu";
import { networksService, walletsService } from "@bot/services";
import { bech32 } from "bech32";
import { agreementKeyboard } from "@bot/menu/utils";
import { isValidAddress } from "@bot/utils/isValid";
import { config } from "@bot/chains";

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
    const parsedValue = address.replace(/\s+/g, "");

    if (!isValidAddress(parsedValue)) {
      return ctx.reply("Please enter valid address");
    }

    const prefix = bech32.decode(address).prefix;
    const isValidChain = config.some(({ network }) => {
      return network === prefix;
    });

    if (!isValidChain) {
      return ctx.reply("I'm don't support this chain");
    }

    const { network } = await getNetwork({ name: prefix });
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

feature
  .filter((ctx) => ctx.session.step === "wallet")
  .callbackQuery("yes", async (ctx) => {
    await ctx.reply(`Add one more price alarm`);
  });

feature
  .filter((ctx) => ctx.session.step === "wallet")
  .callbackQuery("no", async (ctx) => {
    ctx.session.step = undefined;
    return ctx.reply("Perfect! Now you can use /assets command");
  });
