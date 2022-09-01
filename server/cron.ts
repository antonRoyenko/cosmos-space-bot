import fastifyCron from "fastify-cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  usersService,
  networksService,
  alarmsService,
  alarmPricesService,
} from "@bot/services";
import { notificationDao, networkInNotificationDao } from "@bot/dao";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";
import { sendNotification } from "@server/telegram";

export function cron(server: any) {
  server.register(fastifyCron, {
    jobs: [
      {
        cronTime: "0 * * * *",

        onTick: async () => {
          dayjs.extend(utc);
          dayjs.extend(timezone);
          dayjs.extend(localizedFormat);

          const { getUser } = usersService();
          const { getNetwork } = networksService();

          const notifications = await notificationDao.getAllNotifications();

          for (const notification of notifications) {
            let prices = "";
            const reminderNetworks =
              await networkInNotificationDao.getAllNetworkInNotification({
                where: {
                  notificationId: notification.id,
                },
              });
            const user = (await getUser({
              id: notification.userId,
            })) || {
              timezone: "",
              telegramId: 0,
            };

            const now = dayjs();
            const userTime = dayjs.tz(now, user.timezone);
            // TODO fix message
            prices += `Price reminder for ${userTime.format("LLL")} \n\n`;

            for (const reminder of reminderNetworks) {
              const { network, publicUrl, denom } = await getNetwork({
                networkId: Number(reminder.reminderNetworkId),
              });
              const networkPrice = await getTokenPrice({
                publicUrl,
                denom,
              });
              prices += `${network.fullName} - ${networkPrice.price}$ \n`;
            }

            if (
              notification.notificationReminderTime.includes(
                userTime.format("LT")
              )
            ) {
              sendNotification(prices, "HTML", Number(user.telegramId));
            }
          }
        },
      },
      {
        cronTime: "*/2 * * * *",

        onTick: async () => {
          const { getAllAlarms } = await alarmsService();
          const { getAllAlarmPrices, removeAlarmPrice } = alarmPricesService();
          const { getNetwork } = networksService();
          const { getUser } = usersService();

          const alarms = await getAllAlarms(true);
          for (const alarm of alarms) {
            const { publicUrl, denom, network } = await getNetwork({
              networkId: alarm.networkId,
            });

            const networkPrice = await getTokenPrice({
              publicUrl,
              denom,
            });
            const alarmPrices = await getAllAlarmPrices(alarm.id);

            if (alarmPrices.length === 0) return;

            const user = await getUser({
              id: alarm.userId,
            });

            const sendMessage = async (id: number) => {
              await sendNotification(
                // TODO fix message
                `Alarm ${network.fullName} price is - ${networkPrice.price}`,
                "HTML",
                Number(user?.telegramId)
              );
              await removeAlarmPrice(id);
            };

            for (const price of alarmPrices) {
              const isPositive = price.price - price.coingeckoPrice > 0;

              if (isPositive && networkPrice.price > price.price) {
                await sendMessage(price.id);
              }

              if (!isPositive && networkPrice.price < price.price) {
                await sendMessage(price.id);
              }
            }
          }
        },
      },
    ],
  });
}
