import { Context } from "@bot/types";
import { networksAlarmMenu } from "@bot/menu";
import {
  alarmsService,
  alarmPricesService,
  networksService,
  notificationsService,
} from "@bot/services";
import { InlineKeyboard } from "grammy";
import { MenuFlavor } from "@grammyjs/menu";
import _ from "lodash";

export async function addAlarmCallback(ctx: Context) {
  await ctx.reply("Choose Network", { reply_markup: networksAlarmMenu });
}

export async function deleteAlarmCallback(ctx: Context) {
  const { getAllAlarms } = await alarmsService({ ctx });
  const { getNetwork } = networksService();
  const { getAllAlarmPrices } = alarmPricesService();

  const alarms = await getAllAlarms();

  const inlineKeyboard = new InlineKeyboard();

  for await (const alarm of alarms) {
    const network = (await getNetwork({
      networkId: alarm.networkId,
    })) || { fullName: "", id: 0 };
    const alarmPrices = await getAllAlarmPrices(alarm.id);

    alarmPrices.forEach((item) => {
      inlineKeyboard
        .text(
          `${network.fullName} price - ${item.price}$`,
          `deleteAlarm:alarmPriceId=${item.id}`
        )
        .row();
    });
  }

  await ctx.reply("Choose remove item", { reply_markup: inlineKeyboard });
}
export async function listAlarmsText(ctx: Context): Promise<string> {
  const { isAlarmActive } = await notificationsService({ ctx });

  return isAlarmActive ? "Enabled 🔔" : "Disabled 🔕";
}

export async function listAlarmsCallback(ctx: Context) {
  let output = "You have alarms on: \n";
  const { getAllAlarms } = await alarmsService({ ctx });
  const { getNetwork } = networksService();
  const { getAllAlarmPrices } = alarmPricesService();
  const alarms = await getAllAlarms();

  for await (const alarm of alarms) {
    const network = (await getNetwork({
      networkId: alarm.networkId,
    })) || { fullName: "", id: 0 };
    const alarmPrices = await getAllAlarmPrices(alarm.id);
    const priceArr = _.map(alarmPrices, "price");

    output += `${network.fullName} at price: ${priceArr.join("$, ")}$ \n`;
  }

  return ctx.reply(output);
}

export async function toggleAlarmActivity(ctx: Context & MenuFlavor) {
  const { updateNotification } = await notificationsService({ ctx });
  await updateNotification({ triggerAlarmActivity: true });

  ctx.menu.update();
}
