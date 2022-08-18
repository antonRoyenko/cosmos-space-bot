import { Menu } from "@grammyjs/menu";
import {
  alarmsService,
  notificationsService,
  networksService,
} from "@bot/services";
import { alarmNetworksMenu } from "./alarmNetworks";
import { Context } from "@bot/types";
import { InlineKeyboard } from "grammy";

export const alarmMenu = new Menu<Context>("alarm")
  .text("Add alarm", (ctx) =>
    ctx.reply("Choose Network", { reply_markup: alarmNetworksMenu })
  )
  .row()
  .text("Delete alarms", async (ctx) => {
    const { getAllAlarms } = await alarmsService({ ctx });
    const { getNetwork } = networksService();
    const alarms = await getAllAlarms();

    const inlineKeyboard = new InlineKeyboard();

    for await (const alarm of alarms) {
      const network = (await getNetwork({
        networkId: alarm.networkId,
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
    const { getAllAlarms } = await alarmsService({ ctx });
    const { getNetwork } = networksService();
    const alarms = await getAllAlarms();

    for await (const alarm of alarms) {
      const network = (await getNetwork({
        networkId: alarm.networkId,
      })) || { fullName: "", id: 0 };

      output += `${network.fullName} at price: ${alarm.alarmPrices.join(
        "$, "
      )}$ \n`;
    }

    return ctx.reply(output);
  })
  .row()
  .text(
    async (ctx) => {
      const { isAlarmActive } = await notificationsService({ ctx });

      return isAlarmActive ? "Enabled 🔔" : "Disabled 🔕";
    },
    async (ctx) => {
      const { updateNotification } = await notificationsService({ ctx });
      await updateNotification({ triggerAlarmActivity: true });

      ctx.menu.update();
    }
  )
  .row()
  .back("Go back");
