import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService, networksInNotificationService } from "@bot/services";
import { Context } from "@bot/types";
import {
  governanceSubscription,
  observer,
} from "@bot/graphql/queries/governanceSubscription";
import dayjs from "dayjs";

// TODO find error gql.likecoin.forbole.com/v1/graphql
export const proposalMenu = new Menu<Context>("governance", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const networks = await getAllNetworks();

  for (let i = 0; i < networks.length; i++) {
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
        if (!isGovActive) {
          governanceSubscription(network.wsPublicUrl, ctx, time);
        } else {
          observer.unsubscribe();
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
  range.back("Back");

  return range;
});
