import { Menu, MenuRange } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { walletRemoveMenu } from "./walletRemove";
import { usersService } from "@bot/services";

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
      const { id: telegramId } = ctx.from;
      const userWallets = await usersService.getUserWallets(telegramId);

      if (userWallets) {
        userWallets.forEach(({ wallet }, key) => {
          wallets += `Wallet ${key + 1} - ${wallet} \n`;
        });
      }

      await ctx.reply(wallets);
    })
    .row()
    .text("Delete wallet(s)", (ctx) =>
      ctx.reply("Choose wallet which you want remove", {
        reply_markup: walletRemoveMenu,
      })
    );
  return range;
});
