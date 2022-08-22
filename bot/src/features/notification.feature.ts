import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { notificationMenu } from "@bot/menu";
import { getCountry } from "countries-and-timezones";
import { countries } from "@bot/constants/country";
import { timezoneMenu, alarmMenu } from "@bot/menu";
import _ from "lodash";
import { alarmPricesService, alarmsService } from "@bot/services";
import { agreementKeyboard } from "@bot/menu/utils";

export const feature = router.route("notification");

feature.command(
  "notification",
  logHandle("handle /notification"),
  async (ctx) => {
    await ctx.reply("Choose", { reply_markup: notificationMenu });
  }
);

feature
  .filter((ctx) => !_.isEmpty(ctx.session.alarmNetwork))
  .on("message", async (ctx) => {
    const network = ctx.session.alarmNetwork;
    const price = ctx.message.text || "";

    if (network) {
      const { updateAlarmNetworks } = await alarmsService({ ctx });
      await updateAlarmNetworks(price, network.id);

      await ctx.reply(`Do you want add more ?`, {
        reply_markup: agreementKeyboard,
      });
    }
  });

feature
  .filter((ctx) => ctx.session.step === "timezone")
  .on("message", async (ctx) => {
    const country = ctx.message.text || "";

    const currentCountry = countries.find(({ name }) => name === country) || {
      code: "",
    };
    const parseCountry = getCountry(currentCountry.code);
    if (parseCountry?.timezones) {
      ctx.session.timezone = parseCountry.timezones;

      return ctx.reply("Choose your timezone", { reply_markup: timezoneMenu });
    }
  });

feature
  .filter((ctx) => ctx.session.step === "notification")
  .callbackQuery("yes", async (ctx) => {
    await ctx.reply(`Add one more price alarm`);
  });

feature
  .filter((ctx) => ctx.session.step === "notification")
  .callbackQuery("no", async (ctx) => {
    ctx.session.alarmNetwork = undefined;
    await ctx.reply("Alarm saved", { reply_markup: alarmMenu });
  });

feature.callbackQuery(/^deleteAlarm:/, async (ctx) => {
  const data = ctx.callbackQuery.data;
  // eslint-disable-next-line no-useless-escape
  const [alarmPriceId] = data.match(/\d{1,2}([\.,][\d{1,2}])?/g) || [];
  const { removeAlarmPrice } = alarmPricesService();
  await removeAlarmPrice(Number(alarmPriceId));
  ctx.session.step = "notification";
  await ctx.reply("Price was removed", { reply_markup: notificationMenu });
});
