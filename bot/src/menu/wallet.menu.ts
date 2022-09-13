import { Menu, MenuRange } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { en } from "@bot/constants/en";
import { config } from "@bot/config";
import {
  addManuallyCallback,
  bulkImportCallback,
  walletListCallback,
  deleteWalletCallback,
  bulkExportCallback,
} from "@bot/menu/callbacks";

export const walletMenu = new Menu<Context>("wallets", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  ctx.session.step = undefined;
  const range = new MenuRange<Context>();

  range
    .webApp(
      en.wallet.menu.keplr,
      `${config.UI_URL}/warning?telegram-id=${ctx.from?.id}`
    )
    .text(en.wallet.menu.manually, addManuallyCallback)
    .row()
    .text(en.wallet.menu.bulkImport, bulkImportCallback)
    .text(en.wallet.menu.bulkExport, bulkExportCallback)
    .row()
    .text(en.wallet.menu.list, walletListCallback)
    .text(en.wallet.menu.delete, deleteWalletCallback);

  return range;
});
