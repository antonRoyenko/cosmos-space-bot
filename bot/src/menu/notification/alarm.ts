import { Menu } from "@grammyjs/menu";
import { alarmService, usersService } from "@bot/services";
import { alarmNetworksMenu } from "./alarmNetworks";
import { Context } from "@bot/types";
import { InlineKeyboard } from "grammy";

export const alarmMenu = new Menu<Context>("alarm")
  .text("Add alarm", (ctx) =>
    ctx.reply("Choose Network", { reply_markup: alarmNetworksMenu })
  )
  .row()
  .text("Delete alarms", async (ctx) => {
    const alarmNetwork = await usersService.getAllAlarms();

    const inlineKeyboard = new InlineKeyboard();

    for await (const alarm of alarmNetwork) {
      const network = (await usersService.getNetwork({
        id: alarm.networkId,
      })) || { fullName: "", id: 0 };

      alarm.alarmPrices.forEach((price) => {
        inlineKeyboard
          .text(
            `${network.fullName} price - ${price}$`,
            `deleteAlarm:networkId=${network.id}&price=${price}`
          )
          .row();
      });
    }

    await ctx.reply("Choose remove item", { reply_markup: inlineKeyboard });
  })
  .row()
  .text("List alarms", async (ctx) => {
    let output = "You have alarms on: \n";
    const alarmNetwork = await usersService.getAllAlarms();

    for await (const alarm of alarmNetwork) {
      const network = (await usersService.getNetwork({
        id: alarm.networkId,
      })) || { fullName: "" };

      output += `${network.fullName} at price: ${alarm.alarmPrices.join(
        "$, "
      )}$ \n`;
    }

    return ctx.reply(output);
  })
  .row()
  .text(
    async (ctx) => {
      const { isAlarmActive } = await alarmService({ ctx });

      return isAlarmActive ? "Enabled 🔔" : "Disabled 🔕";
    },
    async (ctx) => {
      const { updateAlarm } = await alarmService({ ctx });
      await updateAlarm();

      ctx.menu.update();
    }
  )
  .row()
  .back("Go back");
