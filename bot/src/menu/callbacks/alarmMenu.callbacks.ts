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
import { en } from "@bot/constants/en";
import { template } from "@bot/utils";

export async function addAlarmCallback(ctx: Context) {
  await ctx.reply(en.notification.alarmMenu.chooseNetworkTitle, {
    reply_markup: networksAlarmMenu,
  });
}

export async function deleteAlarmCallback(ctx: Context) {
  const { getAllAlarms } = await alarmsService({ ctx });
  const { getNetwork } = networksService();
  const { getAllAlarmPrices } = alarmPricesService();

  const alarms = await getAllAlarms();

  const inlineKeyboard = new InlineKeyboard();

  for await (const alarm of alarms) {
    const { network } = await getNetwork({
      networkId: alarm.networkId,
    });
    const alarmPrices = await getAllAlarmPrices(alarm.id);

    alarmPrices.forEach((item) => {
      inlineKeyboard
        .text(
          template(en.notification.alarmMenu.coinPrice, {
            name: network.fullName,
            price: `${item.price}`,
          }),
          `deleteAlarm:alarmPriceId=${item.id}`
        )
        .row();
    });
  }

  await ctx.reply(en.notification.alarmMenu.removeWalletTitle, {
    reply_markup: inlineKeyboard,
  });
}
export async function listAlarmsText(ctx: Context): Promise<string> {
  const { isAlarmActive } = await notificationsService({ ctx });

  return isAlarmActive
    ? en.notification.alarmMenu.enabled
    : en.notification.alarmMenu.disabled;
}

export async function listAlarmsCallback(ctx: Context) {
  let output = en.notification.alarmMenu.alarmList;
  const { getAllAlarms } = await alarmsService({ ctx });
  const { getNetwork } = networksService();
  const { getAllAlarmPrices } = alarmPricesService();
  const alarms = await getAllAlarms();

  for await (const alarm of alarms) {
    const { network } = await getNetwork({
      networkId: alarm.networkId,
    });
    const alarmPrices = await getAllAlarmPrices(alarm.id);
    const priceArr = _.map(alarmPrices, "price");

    output += template(en.notification.alarmMenu.alarmListItem, {
      networkName: network.fullName,
      prices: `${priceArr.join("$, ")}`,
    });
  }

  return ctx.reply(output);
}

export async function toggleAlarmActivity(ctx: Context & MenuFlavor) {
  const { updateNotification } = await notificationsService({ ctx });
  await updateNotification({ triggerAlarmActivity: true });

  ctx.menu.update();
}
