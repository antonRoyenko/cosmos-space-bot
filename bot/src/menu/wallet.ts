import { Menu, MenuRange } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { walletRemove } from "./walletRemove";
import { usersService } from "@bot/services";

export const walletMenu = new Menu<Context>("wallets", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();
  range
    .url("Keplr", `http://127.0.0.1:1234?telegram-id=${ctx.from?.id}`)
    .text("Manually", (ctx) => ctx.reply("Enter addreess of any cosmos chain"))
    .row()
    .text("Wallet(s) list", async (ctx) => {
      let wallets = "";
      const { id: telegramId } = ctx.from;
      const user = await usersService.getUserByTelegramId(telegramId);
      console.log(3, user?.wallets);
      if (user?.wallets) {
        user.wallets.forEach((item, key) => {
          wallets += `Wallet ${key + 1} - ${item} \n`;
        });
      }

      await ctx.reply(wallets);
    })
    .row()
    .text("Delete wallet(s)", (ctx) =>
      ctx.reply("Choose wallet which you want remove", {
        reply_markup: walletRemove,
      })
    );
  return range;
});
