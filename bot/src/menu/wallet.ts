import { Menu, MenuRange } from "@grammyjs/menu";

export const walletMenu = new Menu("products", { autoAnswer: false }).dynamic(
  async (ctx) => {
    const range = new MenuRange();
    range
      .url("Keplr", `http://127.0.0.1:1234?telegram-id=${ctx.from?.id}`)
      .text("Manually", (ctx) => ctx.reply("Manually"))
      .row()
      .text("Delete wallet(s)", (ctx) => ctx.reply("Delete"));
    return range;
  }
);
