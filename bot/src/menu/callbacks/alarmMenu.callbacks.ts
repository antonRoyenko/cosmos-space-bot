import { Context } from "@bot/types";
import { networksAlarmMenu } from "@bot/menu";
import {
  alarmsService,
  networksService,
  notificationsService,
} from "@bot/services";
import { InlineKeyboard } from "grammy";
import { MenuFlavor } from "@grammyjs/menu";

export async function addAlarmCallback(ctx: Context) {
  await ctx.reply("Choose Network", { reply_markup: networksAlarmMenu });
}

export async function deleteAlarmCallback(ctx: Context) {
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
}
export async function listAlarmsText(ctx: Context): Promise<string> {
  const { isAlarmActive } = await notificationsService({ ctx });

  return isAlarmActive ? "Enabled 🔔" : "Disabled 🔕";
}

export async function listAlarmsCallback(ctx: Context) {
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
}

export async function toggleAlarmActivity(ctx: Context & MenuFlavor) {
  const { updateNotification } = await notificationsService({ ctx });
  await updateNotification({ triggerAlarmActivity: true });

  ctx.menu.update();
}
