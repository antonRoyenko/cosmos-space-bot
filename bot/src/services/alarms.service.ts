import { Context } from "@bot/types";
import { alarmDao } from "@bot/dao";
import { alarmPricesService } from "./alarmPrices.service";
import { networksService } from "./networks.service";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";

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
    const { getAllAlarmPrices } = alarmPricesService();
    const { getNetwork } = networksService();

    const alarm = (await getAlarm(networkId)) || { id: 0 };
    const { coingeckoId } = await getNetwork({ networkId });
    const alarmPrices = (await getAllAlarmPrices(alarm.id)) || {
      id: 0,
    };

    const tokenPrices = await getTokenPrice({ apiId: coingeckoId });
    const createAlarmPrice = {
      price: Number(price),
      coingeckoPrice: tokenPrices.price,
    };
    const alarmPrice = alarmPrices.find((item) => item.price === Number(price));

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
        alarmPrices: {
          create: createAlarmPrice,
        },
      },
      update: !alarmPrice?.id
        ? {
            alarmPrices: {
              create: createAlarmPrice,
            },
          }
        : {},
    });
  };

  const getAllAlarms = (all = false) => {
    const args = all ? {} : { where: { userId: user.id } };
    return alarmDao.getAllAlarms(args);
  };

  return {
    updateAlarmNetworks,
    getAllAlarms,
    getAlarm,
  };
}
