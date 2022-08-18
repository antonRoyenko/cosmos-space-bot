import { Context } from "@bot/types";
import { Network } from "@prisma/client";
import { alarmDao } from "@bot/dao";

export async function alarmsService({
  ctx,
  network,
}: {
  ctx?: Context;
  network?: Network;
} = {}) {
  const user = ctx?.local.user || {
    id: 0,
  };
  const alarm = (await alarmDao.getAlarm({ where: { userId: user.id } })) || {
    id: 0,
    userId: 0,
    alarmPrices: [""],
    networkId: 0,
  };

  if (!alarm && network) {
    await alarmDao.createAlarm({
      data: {
        userId: user.id,
        networkId: network.id,
      },
    });
  }

  const updateAlarmNetworks = async (price: string, networkId: number) => {
    let prices = alarm?.alarmPrices || [];
    if (alarm?.alarmPrices.includes(price)) {
      prices = prices.filter((item) => item !== price);
    } else {
      prices = [...prices, price];
    }
    console.log(prices);

    if (alarm) {
      await alarmDao.updateAlarm({
        where: {
          userId: user.id,
          networkId: networkId,
        },
        data: {
          alarmPrices: prices,
        },
      });
    }
  };

  const getAllAlarms = () => alarmDao.getAllAlarms();

  return {
    updateAlarmNetworks,
    alarm,
    getAllAlarms,
  };
}
