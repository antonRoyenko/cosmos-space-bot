import { router } from "@bot/middlewares";
import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { walletMenu } from "@bot/menu";
import { networksService, walletsService } from "@bot/services";
import { bech32 } from "bech32";
import { agreementKeyboard } from "@bot/menu/utils";
import { en } from "@bot/constants/en";
import { template, validation, loadAddresses } from "@bot/utils";

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

    const [address, name] = ctx.message.text.split("\n");

    if (!address || !name) return ctx.reply(en.wallet.invalidFormat);

    console.log(44, address, name);
    const parsedValue = address.replace(/\s+/g, "");

    if (!validation.isValidAddress(parsedValue)) {
      return ctx.reply(en.wallet.invalidAddress);
    }

    const prefix = bech32.decode(address).prefix;
    const { network } = await getNetwork({ name: prefix });
    const userWallets = await getAllUserWallets();

    if (!validation.isValidChain(parsedValue)) {
      return ctx.reply(
        template(en.wallet.invalidNetwork, { networkName: network.fullName })
      );
    }

    if (validation.isDuplicateAddress(userWallets, parsedValue)) {
      return ctx.reply(en.wallet.duplicateAddress);
    }

    if (network) {
      await createUserWallet(network.id, parsedValue);
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

feature
  .filter((ctx) => ctx.session.step === "bulkImportWallet")
  .on("message:document", logHandle("handle wallet"), async (ctx) => {
    const { bulkCreateUserWallet } = walletsService(ctx);
    const file = await ctx.getFile();
    const path = await file.download();

    const result = await loadAddresses(path, ctx);

    if (typeof result === "string") return ctx.reply(result);

    if (Array.isArray(result)) {
      await bulkCreateUserWallet(result);

      await ctx.reply(en.wallet.successfulImport);
    }
  });
