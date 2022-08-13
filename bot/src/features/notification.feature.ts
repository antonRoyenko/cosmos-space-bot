import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { notificationMenu } from "@bot/menu";
import { getCountry } from "countries-and-timezones";
import { countries } from "@bot/constants/country";
import { timezoneMenu } from "@bot/menu/notification/timezone";
import _ from "lodash";
import { alarmService, usersService } from "@bot/services";
import { agreementKeyboard } from "@bot/menu/keyboards";
import { alarmMenu } from "@bot/menu/notification/alarm";

export const feature = router.route("notification");

feature.command(
  "notification",
  logHandle("handle /notification"),
  async (ctx) => {
    await ctx.reply("Choose", { reply_markup: notificationMenu });

    // governanceSubscription();
  }
);

feature
  .filter((ctx) => {
    console.log(ctx.session.alarmNetwork);
    return !_.isEmpty(ctx.session.alarmNetwork);
  })
  .on("message", async (ctx) => {
    const network = ctx.session.alarmNetwork;
    const price = ctx.message.text || "";
    console.log(123, price, network);

    if (network) {
      const { updateAlarmNetworks } = await alarmService({ ctx, network });
      await updateAlarmNetworks(price, network);

      await ctx.reply(`Do you want add more ?`, {
        reply_markup: agreementKeyboard,
      });
    }
  });

feature
  .filter((ctx) => ctx.session.step === "timezone")
  .on("message", async (ctx) => {
    console.log(55);
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

feature.callbackQuery("yes", async (ctx) => {
  await ctx.reply(`Add one more price alarm`);
});

feature.callbackQuery("no", async (ctx) => {
  ctx.session.alarmNetwork = undefined;
  await ctx.reply("Alarm saved", { reply_markup: alarmMenu });
});

feature.callbackQuery(/^deleteAlarm:/, async (ctx) => {
  console.log(356);
  const data = ctx.callbackQuery.data;
  // eslint-disable-next-line no-useless-escape
  const [networkId, price] = data.match(/\d{1,2}([\.,][\d{1,2}])?/g) || [];
  const alarm = (await usersService.getAlarmNetwork(Number(networkId))) || {
    id: 0,
    alarmPrices: [],
  };
  const prices = alarm?.alarmPrices.filter((item) => item !== price);
  await usersService.removeAlarmPrice(alarm.id, prices);
  ctx.session.step = "notification";
  await ctx.reply("Price was removed", { reply_markup: notificationMenu });
});
