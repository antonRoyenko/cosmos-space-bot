import { Context } from "@bot/types";
import { en } from "@bot/constants/en";
import { walletsService } from "@bot/services";
import { getNumberEmoji, template } from "@bot/utils";
import { walletRemoveMenu } from "@bot/menu";

export async function addManuallyCallback(ctx: Context) {
  ctx.session.step = "wallet";
  return ctx.reply(en.wallet.addAddress);
}

export async function bulkImportCallback(ctx: Context) {
  ctx.session.step = "bulkImportWallet";
  return ctx.reply(en.wallet.addBulkWallet);
}

export async function walletListCallback(ctx: Context) {
  let wallets = "";
  const { getAllUserWallets } = walletsService(ctx);
  const userWallets = await getAllUserWallets();

  if (userWallets.length === 0) {
    return ctx.reply(en.wallet.emptyWallet);
  }

  userWallets.forEach(
    ({ address }, key) =>
      (wallets +=
        template(en.wallet.showWallet, {
          number: getNumberEmoji(key + 1),
          address,
        }) + "\n\n")
  );

  await ctx.reply(wallets);
}

export async function deleteWalletCallback(ctx: Context) {
  const { getAllUserWallets } = walletsService(ctx);
  const userWallets = await getAllUserWallets();

  if (userWallets.length === 0) {
    return ctx.reply(en.wallet.emptyWallet);
  }

  return ctx.reply(en.wallet.deleteWallet, {
    reply_markup: walletRemoveMenu,
  });
}
