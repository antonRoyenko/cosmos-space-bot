import { Context } from "@bot/types";
import { Network } from "@prisma/client";
import { alarmDao, userDao } from "@bot/dao";

export async function alarmsService({
  ctx,
}: {
  ctx?: Context;
} = {}) {
  const user = ctx?.local.user || {
    id: 0,
  };
  const getAlarm = async (networkId: number) =>
    await alarmDao.getAlarm({
      where: {
        userId_networkId: {
          userId: user.id,
          networkId: networkId,
        },
      },
    });

  const updateAlarmNetworks = async (
    price: string,
    networkId: number,
    userId?: number
  ) => {
    const alarm = await getAlarm(networkId);
    let prices = alarm?.alarmPrices || [];
    console.log(4, prices, alarm);
    if (alarm?.alarmPrices.includes(price)) {
      prices = prices.filter((item) => item !== price);
    } else {
      prices = [...prices, price];
    }

    await alarmDao.upsertAlarm({
      where: {
        userId_networkId: {
          userId: userId ? userId : user.id,
          networkId: networkId,
        },
      },
      create: {
        networkId: networkId,
        userId: userId ? userId : user.id,
        alarmPrices: prices,
      },
      update: {
        alarmPrices: prices,
      },
    });
  };

  const getAllAlarms = () => alarmDao.getAllAlarms();

  return {
    updateAlarmNetworks,
    getAllAlarms,
    getAlarm,
  };
}
