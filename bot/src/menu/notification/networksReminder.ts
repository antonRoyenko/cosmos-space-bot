import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";

export const networksReminderMenu = new Menu<Context>("reminderNetworks", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const networks = await usersService.getNetworks();

    if (networks.length > 0) {
      for (let i = 0; i < networks.length; i++) {
        const network = networks[i];
        range
          .text(
            async (ctx) => {
              const user = await usersService.getUserByTelegramId(
                Number(ctx?.from?.id)
              );
              const notification = await usersService.getUserNotification(
                Number(user?.notificationId)
              );
              const isActive = notification?.reminderNetworksIds.some(
                (reminderNetwork) => reminderNetwork.id === network.id
              );

              return isActive
                ? `${network.fullName} 🔔`
                : `${network.fullName} 🔕`;
            },
            async (ctx) => {
              const user = await usersService.getUserByTelegramId(
                Number(ctx?.from?.id)
              );
              const notification = await usersService.getUserNotification(
                Number(user?.notificationId)
              );
              const notificationId = notification?.reminderNetworksIds.map(
                ({ id }) => ({
                  id,
                })
              );
              if (
                notificationId?.some(
                  (reminderNetwork) => reminderNetwork.id === network.id
                )
              ) {
                await usersService.removeUserNotification(
                  Number(user?.notificationId),
                  { id: network.id }
                );
              } else {
                let reminderNetworksIds: { id: number }[] = [];
                if (notificationId) {
                  reminderNetworksIds = [...notificationId, { id: network.id }];
                }

                if (notification?.id) {
                  await usersService.upsertUserNotification(notification.id, {
                    networks: reminderNetworksIds,
                  });
                }
              }
              ctx.menu.update();
            }
          )
          .row();
      }
    }
  }

  range.back("Back");

  return range;
});
