import { writeFileSync } from "fs";
import { Context } from "@bot/types";
import { en } from "@bot/constants/en";
import { walletsService } from "@bot/services";
import { getNumberEmoji, template } from "@bot/utils";
import { walletRemoveMenu } from "@bot/menu";
import { InputFile } from "grammy";
import { STEPS } from "@bot/constants/step";
import { Steps } from "@bot/types/general";

export async function addManuallyCallback(ctx: Context) {
  ctx.session.step = "wallet";
  return ctx.reply(en.wallet.addAddress);
}

export async function bulkImportCallback(ctx: Context) {
  ctx.session.step = STEPS.BULK_IMPORT as Steps;
  return ctx.reply(en.wallet.addBulkWallet);
}

export async function bulkExportCallback(ctx: Context) {
  const { getAllUserWallets } = walletsService(ctx);

  const userWallets = await getAllUserWallets();

  let csv = "Address,Name" + "\r\n";

  for (const i of userWallets) {
    csv += i.address + "," + i.name + "\r\n";
  }

  writeFileSync("/tmp/addresses.csv", csv);

  await ctx.replyWithDocument(new InputFile("/tmp/addresses.csv"));
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
