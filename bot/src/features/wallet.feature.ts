import { router } from "@bot/middlewares";
import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { walletMenu } from "@bot/menu";
import { networksService, walletsService } from "@bot/services";
import { bech32 } from "bech32";
import { agreementKeyboard } from "@bot/menu/utils";
import { isValidAddress } from "@bot/utils";
import { config } from "@bot/chains";
import { en } from "@bot/constants/en";

export const feature = router.route("wallet");

feature.command(
  en.wallet.command,
  logHandle("handle /wallet"),
  async (ctx: Context) => {
    await ctx.reply(en.wallet.menu.title, {
      reply_markup: walletMenu,
    });
  }
);

feature
  .filter((ctx) => ctx.session.step === "wallet")
  .on("message:text", logHandle("handle wallet"), async (ctx) => {
    await ctx.replyWithChatAction("typing");
    const { getNetwork } = networksService();
    const { createUserWallet, getAllUserWallets } = walletsService(ctx);

    const address = ctx.message.text;
    const parsedValue = address.replace(/\s+/g, "");

    if (!isValidAddress(parsedValue)) {
      return ctx.reply(en.wallet.invalidAddress);
    }

    const prefix = bech32.decode(address).prefix;
    const isValidChain = config.some(({ network }) => {
      return network === prefix;
    });

    if (!isValidChain) {
      return ctx.reply(en.wallet.invalidNetwork);
    }

    const { network } = await getNetwork({ name: prefix });
    const userWallets = await getAllUserWallets();

    if (userWallets.some((walelt) => walelt.address === address)) {
      return ctx.reply(en.wallet.duplicateAddress);
    }

    if (network) {
      await createUserWallet(network.id, address);
    }

    await ctx.reply(en.addMoreQuestion, {
      reply_markup: agreementKeyboard,
    });
  });

feature
  .filter((ctx) => ctx.session.step === "wallet")
  .callbackQuery("yes", async (ctx) => {
    await ctx.reply(en.wallet.addMore);
  });

feature
  .filter((ctx) => ctx.session.step === "wallet")
  .callbackQuery("no", async (ctx) => {
    ctx.session.step = undefined;
    return ctx.reply(en.wallet.success);
  });
