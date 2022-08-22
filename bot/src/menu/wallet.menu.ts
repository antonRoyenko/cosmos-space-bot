import { Menu, MenuRange } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { walletRemoveMenu } from "@bot/menu";
import { walletsService } from "@bot/services";

export const walletMenu = new Menu<Context>("wallets", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();
  range
    .url("Keplr", `http://127.0.0.1:1234?telegram-id=${ctx.from?.id}`)
    .text("Manually", (ctx) => {
      ctx.session.step = "wallet";
      return ctx.reply("Enter addreess of any cosmos chain");
    })
    .row()
    .text("Wallet(s) list", async (ctx) => {
      let wallets = "";
      const { getAllUserWallets } = walletsService(ctx);
      const userWallets = await getAllUserWallets();

      if (userWallets) {
        userWallets.forEach(({ address }, key) => {
          wallets += `Wallet ${key + 1} - ${address} \n`;
        });
      }

      await ctx.reply(wallets);
    })
    .row()
    .text("Delete wallet", (ctx) =>
      ctx.reply("Choose wallet which you want remove", {
        reply_markup: walletRemoveMenu,
      })
    );
  return range;
});
