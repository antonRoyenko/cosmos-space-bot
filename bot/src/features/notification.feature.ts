import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { notificationMenu } from "@bot/menu";
import { getCountry } from "countries-and-timezones";
import { countries } from "@bot/constants/country";
import { timezoneMenu } from "@bot/menu/notification/timezone";

export const feature = router.route("notification");

feature.command(
  "notification",
  logHandle("handle /notification"),
  async (ctx) => {
    await ctx.reply("Choose", { reply_markup: notificationMenu });

    // governanceSubscription();
  }
);

feature.on("message", async (ctx) => {
  const country = ctx.message.text || "";

  const currentCountry = countries.find(({ name }) => name === country) || {
    code: "",
  };
  const parseCountry = getCountry(currentCountry.code);
  console.log(parseCountry);
  if (parseCountry?.timezones) {
    ctx.session.timezone = parseCountry.timezones;

    return ctx.reply("Choose your timezone", { reply_markup: timezoneMenu });
  }
});
