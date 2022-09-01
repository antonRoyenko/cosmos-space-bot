import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService, networksInNotificationService } from "@bot/services";
import { Context } from "@bot/types";
import {
  governanceSubscription,
  observer,
} from "@bot/graphql/queries/governanceSubscription";
import dayjs from "dayjs";
import { en } from "@bot/constants/en";

export const proposalMenu = new Menu<Context>("governance", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const networks = await getAllNetworks();
  const sortedNetworks = networks.sort((a, b) =>
    a.fullName.localeCompare(b.fullName)
  );

  for (let i = 0; i < sortedNetworks.length; i++) {
    const network = networks[i];
    const { isGovActive, updateGovernance } =
      await networksInNotificationService({
        ctx,
        network,
      });
    const time = dayjs().toDate();

    range.text(
      isGovActive ? `🔔 ${network.fullName}` : `🔕 ${network.fullName}`,
      async (ctx) => {
        try {
          if (!isGovActive) {
            governanceSubscription(network.wsPublicUrl, ctx, time);
          } else {
            observer.unsubscribe();
          }
        } catch (e) {
          console.error(e);
        }

        await updateGovernance(time);
        ctx.menu.update();
      }
    );

    if ((i + 1) % 2 == 0) {
      range.row();
    }
  }

  range.row();
  // TODO add Enable all button to all place
  range.back(en.back);

  return range;
});
