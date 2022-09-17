import { Menu, MenuRange } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { networksService, walletsService } from "@bot/services";
import { assetsCallback } from "@bot/menu/callbacks";
import { en } from "@bot/constants/en";
import { getBalance } from "@bot/api";
import { getNumberEmoji, template } from "@bot/utils";

export const assetsMenu = new Menu<Context>("assets", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  const { getAllUserWallets } = walletsService(ctx);
  const userWallets = await getAllUserWallets();

  for (let i = 0; i < userWallets.length; i++) {
    const wallet = userWallets[i];
    range.text(wallet.name || wallet.address, async (ctx) => {
      const output = await assetsCallback(wallet);
      return ctx.reply(output);
    });

    range.row();
  }

  range.row();
  range.text(en.assets.menu.all, async () => {
    await ctx.replyWithChatAction("typing");
    const outputObj: {
      [key: string]: number;
    } = {};

    console.log(111);

    for await (const wallet of userWallets) {
      const { getNetwork } = networksService();
      const { address, networkId } = wallet;
      const { publicUrl, network } = await getNetwork({
        networkId,
      });

      const data = await getBalance(publicUrl, address, network.name, false);
      outputObj[network.name] = outputObj[network.name]
        ? Number(outputObj[network.name]) + Number(data.total.value)
        : Number(data.total.value);
    }

    let output = "";

    console.log(222, outputObj);
    Object.entries(outputObj).forEach(([key, value], index) => {
      output += template(en.assets.menu.total, {
        number: getNumberEmoji(index + 1),
        networkName: key,
        amount: `${value}`,
      });
    });

    return ctx.reply(output);
  });

  console.log(999, range);
  return range;
});
