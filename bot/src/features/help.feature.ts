import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";

export const feature = router.route("help");

feature.command("help", logHandle("handle /start"), async (ctx) => {
  await ctx.reply(
    "/wallet - Manage cryptocurrencies in your wallet \n" +
      "/assets - View and Manage Digital Assets \n" +
      "/statistic - View one of the network statistic \n" +
      "/notification - Use notifications to get alerts \n" +
      "/resources - The list of resources about one of the Network \n"
  );
});

// about - Statistic, Personal assets, Notification in Cosmos-based networks.
// description - This bot can send Crypto prices, Wallet(s) assets, and different types of notifications
