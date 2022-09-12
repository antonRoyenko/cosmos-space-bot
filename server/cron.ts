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
import { sendNotification } from "@server/telegram";
import { template } from "@bot/utils";
import { en } from "@bot/constants/en";
import { getProposals, getTokenPrice } from "@bot/api";

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
            prices += template(en.cron.reminderTitle, {
              date: userTime.format("LLL"),
            });

            if (reminderNetworks.length === 0 && !notification.isReminderActive)
              return;

            for (const reminder of reminderNetworks) {
              const { network, coingeckoId } = await getNetwork({
                networkId: Number(reminder.reminderNetworkId),
              });
              const networkPrice = await getTokenPrice({
                apiId: coingeckoId,
              });

              prices += template(en.cron.reminderItem, {
                networkName: network.fullName,
                price: `${networkPrice.price}`,
              });
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
            const { network, coingeckoId } = await getNetwork({
              networkId: alarm.networkId,
            });

            const networkPrice = await getTokenPrice({
              apiId: coingeckoId,
            });
            const alarmPrices = await getAllAlarmPrices(alarm.id);

            if (alarmPrices.length === 0) return;

            const user = await getUser({
              id: alarm.userId,
            });

            const sendMessage = async (id: number) => {
              await sendNotification(
                template(en.cron.alarmTitle, {
                  networkName: network.fullName,
                  price: `${networkPrice.price}`,
                }),
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
      {
        cronTime: "* * * * *",

        onTick: async () => {
          const { getUser } = usersService();
          const { getNetwork } = networksService();

          const notifications = await notificationDao.getAllNotifications();

          for (const notification of notifications) {
            const governanceNetworks =
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

            const networks = governanceNetworks.filter(
              (item) => item.governanceNetworkId
            );

            if (networks.length === 0) return;

            for (const network of networks) {
              const item = await getNetwork({ networkId: network.id });
              const { activeProposals } = await getProposals(item.publicUrl);
              const proposals = activeProposals[0];

              if (!proposals) return;

              if (
                dayjs(network.governanceTimeStart).isBefore(
                  dayjs(proposals.votingStartTime)
                )
              ) {
                await sendNotification(
                  template(en.cron.newProposal, {
                    networkName: item.network.fullName,
                    title: proposals.title,
                    description: proposals.description,
                  }),
                  "HTML",
                  Number(user.telegramId)
                );

                await networkInNotificationDao.removeNetworkInNotification({
                  where: {
                    governanceNetworkId: network.id,
                  },
                });

                await networkInNotificationDao.createNetworkInNotification({
                  data: {
                    notificationId: notification.id,
                    governanceNetworkId: network.id,
                    governanceTimeStart: dayjs().toDate(),
                  },
                });
              }
            }
          }
        },
      },
    ],
  });
}
