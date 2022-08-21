import { alarmPricesDao } from "@bot/dao";

export function alarmPricesService() {
  const getAllAlarmPrices = async (alarmId: number) =>
    await alarmPricesDao.getAllAlarmPrices({
      where: {
        alarmId: alarmId,
      },
    });

  const removeAlarmPrice = async (alarmPriceId: number) =>
    await alarmPricesDao.removeAlarmPrice({
      where: {
        id: alarmPriceId,
      },
    });

  return {
    getAllAlarmPrices,
    removeAlarmPrice,
  };
}
