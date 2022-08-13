import fastifyCron from "fastify-cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { usersService } from "@bot/services";
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

          const users = await usersService.getUsers();

          for (const user of users) {
            let prices = "";
            const notification = (await usersService.getUserNotification(
              user.notificationId
            )) || { reminderNetworksIds: [], notificationReminderTime: "" };

            const now = dayjs();
            const userTime = dayjs.tz(now, user.timezone);
            prices += `Price reminder for ${userTime.format("LLL")} \n\n`;

            for (const network of notification.reminderNetworksIds) {
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
          const alarms = await usersService.getAlarms();
          for (const alarm of alarms) {
            const alarmNetworks = await usersService.getAlarmNetworks(alarm.id);
            console.log(alarmNetworks);

            for (const alarmNetwork of alarmNetworks) {
              const network = (await usersService.getNetwork({
                id: alarmNetwork.networkId,
              })) || { name: "", fullName: "" };

              const networkPrice = await getTokenPrice(network.name);

              if (alarmNetwork.alarmPrices.length === 0) return;

              const closest = alarmNetwork.alarmPrices
                .filter((item) => Number(item) > networkPrice.price)
                .reduce(function (prev, curr) {
                  return Math.abs(Number(curr) - networkPrice.price) <
                    Math.abs(Number(prev) - networkPrice.price)
                    ? curr
                    : prev;
                });

              const user = (await usersService.getUserByTelegramId({
                id: alarm.userId,
              })) || { telegramId: 0 };

              await sendNotification(
                `Alarm ${network.fullName} price is - ${networkPrice.price}`,
                "HTML",
                Number(user.telegramId)
              );
              const prices = alarmNetwork.alarmPrices.filter(
                (item) => item !== closest
              );
              await usersService.removeAlarmPrice(alarmNetwork.id, prices);
            }
          }
        },
      },
    ],
  });
}
