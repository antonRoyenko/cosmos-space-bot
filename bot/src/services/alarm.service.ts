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
  let alarm = await usersService.getAlarm(user.id);

  if (!alarm) {
    alarm = await usersService.upsertAlarm({ userId: user.id });
  }

  const isAlarmActive = alarm?.isAlarmActive || false;

  const updateAlarm = async () => {
    await usersService.upsertAlarm({
      userId: user.id,
      isAlarmActive: !isAlarmActive,
    });
  };

  if (network) {
    const alarmNetwork = await usersService.getAlarmNetwork(network.id);

    const updateAlarmNetworks = async (price: string, network: Network) => {
      let arr = alarmNetwork?.alarmPrices || [];
      if (alarmNetwork?.alarmPrices.includes(price)) {
        arr = arr.filter((item) => item !== price);
      } else {
        arr = [...arr, price];
      }

      console.log(56, alarm, arr);
      if (alarm) {
        await usersService.upsertAlarmNetwork({
          networkId: network.id,
          alarmPrices: arr,
          alarmId: alarm.id,
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
