import { usersService } from "@bot/services/index";
import { Context } from "@bot/types";
import { Network } from "@prisma/client";
import { alarmDao } from "@bot/dao";

type Networks = {
  updateAlarmNetworks: (time: string, network: Network) => Promise<void>;
};

export async function alarmsService({
  ctx,
  network,
}: {
  ctx: Context;
  network: Network;
}): Promise<Networks> {
  const user = ctx.local.user || {
    id: 0,
  };
  const alarm = await alarmDao.getAlarm({ where: { userId: user.id } });

  if (!alarm && network) {
    await alarmDao.createAlarm({
      data: {
        userId: user.id,
        networkId: network.id,
      },
    });
  }

  const updateAlarmNetworks = async (price: string, network: Network) => {
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
          networkId: network.id,
        },
        data: {
          alarmPrices: prices,
        },
      });
    }
  };

  return {
    updateAlarmNetworks,
  };
}
