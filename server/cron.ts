import fastifyCron from "fastify-cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { usersService, networksService, alarmsService } from "@bot/services";
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
          // const { getAllNotifications } = await notificationsService({});
          // const {} = networksInNotificationService();

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
            prices += `Price reminder for ${userTime.format("LLL")} \n\n`;

            for (const reminder of reminderNetworks) {
              const network = (await getNetwork({
                networkId: Number(reminder.reminderNetworkId),
              })) || {
                name: "",
                fullName: "",
              };
              const networkPrice = await getTokenPrice(network.name);
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
          const { getAllAlarms, updateAlarmNetworks } = await alarmsService();
          const { getNetwork } = networksService();
          const { getUser } = usersService();

          const alarms = await getAllAlarms();
          for (const alarm of alarms) {
            const network = (await getNetwork({
              networkId: alarm.networkId,
            })) || { name: "", fullName: "" };

            const networkPrice = await getTokenPrice(network.name);

            if (alarm.alarmPrices.length === 0) return;

            const closest = alarm.alarmPrices
              .filter((item) => Number(item) > networkPrice.price)
              .reduce(function (prev, curr) {
                return Math.abs(Number(curr) - networkPrice.price) <
                  Math.abs(Number(prev) - networkPrice.price)
                  ? curr
                  : prev;
              });

            const user = (await getUser({
              id: alarm.userId,
            })) || { telegramId: 0 };

            await sendNotification(
              `Alarm ${network.fullName} price is - ${networkPrice.price}`,
              "HTML",
              Number(user.telegramId)
            );
            await updateAlarmNetworks(closest, alarm.id);
          }
        },
      },
    ],
  });
}
