import { router } from "@bot/middlewares";
import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { walletMenu } from "@bot/menu";
import { networksService, walletsService } from "@bot/services";
import { bech32 } from "bech32";
import { agreementKeyboard } from "@bot/menu/utils";
import { en } from "@bot/constants/en";
import { template, validation, loadAddresses, encrypt } from "@bot/utils";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";
import { STEPS } from "@bot/constants/step";
import { removeSpace } from "@bot/constants/regex";
import { KEYBOARD } from "@bot/constants/keyboard";
import { Steps } from "@bot/types/general";

export const feature = router.route(ROUTE.WALLET);

feature.command(
  en.wallet.command,
  logHandle(ROUTE_LOGS.WALLET),
  async (ctx: Context) => {
    if (!ctx.session.walletPassword) {
      ctx.session.step = STEPS.WALLET_PASSWORD as Steps;

      await ctx.reply(en.wallet.emptyPassword);
      return;
    }

    await ctx.reply(en.wallet.menu.title, {
      reply_markup: walletMenu,
      disable_web_page_preview: true,
    });
  }
);

feature
  .filter((ctx) => ctx.session.step === STEPS.WALLET)
  .on("message:text", logHandle(ROUTE_LOGS.WALLET), async (ctx) => {
    await ctx.replyWithChatAction("typing");
    const { getNetwork } = networksService();
    const { createUserWallet, getAllUserWallets } = walletsService(ctx);

    const [address, name] = ctx.message.text.split("\n");

    if (!address || !name) return ctx.reply(en.wallet.invalidFormat);

    const parsedValue = address.replace(removeSpace, "");

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
      const { iv, encryptedData } = encrypt(
        parsedValue,
        ctx.session.walletPassword
      );

      await createUserWallet({
        networkId: network.id,
        address: encryptedData,
        name,
        iv,
      });
    }

    await ctx.reply(en.addMoreQuestion, {
      reply_markup: agreementKeyboard,
    });
  });

feature
  .filter((ctx) => ctx.session.step === STEPS.WALLET_PASSWORD)
  .on("message:text", async (ctx) => {
    ctx.session.walletPassword = ctx.message.text;

    await ctx.reply(
      "Password was saved, now you can secure use wallet management"
    );

    await ctx.reply(en.wallet.menu.title, {
      reply_markup: walletMenu,
      disable_web_page_preview: true,
    });
  });

feature
  .filter((ctx) => ctx.session.step === STEPS.WALLET)
  .callbackQuery(KEYBOARD.CALLBACK_YES, async (ctx) => {
    await ctx.reply(en.wallet.addMore);
  });

feature
  .filter((ctx) => ctx.session.step === STEPS.WALLET)
  .callbackQuery(KEYBOARD.CALLBACK_NO, async (ctx) => {
    ctx.session.step = undefined;
    return ctx.reply(en.wallet.success);
  });

feature
  .filter((ctx) => ctx.session.step === STEPS.BULK_IMPORT)
  .on("message:document", logHandle(ROUTE_LOGS.WALLET), async (ctx) => {
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
