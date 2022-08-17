import { usersService } from "@bot/services/index";
import { Context } from "@bot/types";
import { Network } from "@prisma/client";

type Networks = {
  updateAlarmNetworks: (time: string, network: Network) => Promise<void>;
};

type Alarm = {
  isAlarmActive: boolean;
  updateAlarm: () => Promise<void>;
};

export async function createService({ ctx }: { ctx: Context }): Promise<Alarm>;
export async function createService({
  ctx,
  network,
}: {
  ctx: Context;
  network: Network;
}): Promise<Networks>;
export async function createService({
  ctx,
  network,
}: {
  ctx: Context;
  network?: Network;
}) {
  const user = ctx.local.user || {
    id: 0,
    notificationId: 0,
    telegramId: 0,
  };
  const alarm = await usersService.getAlarm({ userId: user.id });
  const notification = (await usersService.getUserNotification(user.id)) || {
    id: 0,
    isAlarmActive: false,
  };

  if (!alarm && network) {
    await usersService.upsertAlarm({
      userId: user.id,
      networkId: network.id,
    });
  }

  const isAlarmActive = notification.isAlarmActive;

  const updateAlarm = async () => {
    await usersService.upsertUserNotification(Number(user?.id), {
      isReminderActive: !isAlarmActive,
    });
  };

  if (network) {
    const alarmNetwork = await usersService.getAlarm({ networkId: network.id });

    const updateAlarmNetworks = async (price: string, network: Network) => {
      let prices = alarmNetwork?.alarmPrices || [];
      if (alarmNetwork?.alarmPrices.includes(price)) {
        prices = prices.filter((item) => item !== price);
      } else {
        prices = [...prices, price];
      }
      console.log(prices);

      if (alarm) {
        await usersService.upsertAlarm({
          userId: user.id,
          alarmPrices: prices,
          networkId: network.id,
        });
      }
    };

    return {
      updateAlarmNetworks,
    };
  }

  return {
    isAlarmActive,
    updateAlarm,
  };
}
