import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { notificationMenu } from "@bot/menu";
import { getCountry } from "countries-and-timezones";
import { countries } from "@bot/constants/country";
import { timezoneMenu, alarmMenu } from "@bot/menu";
import _ from "lodash";
import { alarmPricesService, alarmsService } from "@bot/services";
import { agreementKeyboard } from "@bot/menu/utils";
import { isNumber } from "@bot/utils";
import { getFlagEmoji } from "@bot/utils/getEmoji";
import { en } from "@bot/constants/en";

export const feature = router.route("notification");

feature.command(
  en.notification.command,
  logHandle("handle /notification"),
  async (ctx) =>
    await ctx.reply(en.notification.menu.title, {
      reply_markup: notificationMenu,
    })
);

feature
  .filter((ctx) => !_.isEmpty(ctx.session.alarmNetwork))
  .on("message", async (ctx) => {
    const network = ctx.session.alarmNetwork;
    const price = ctx.message.text || "";

    if (price.includes("$")) {
      await ctx.reply(en.notification.alarmMenu.incorrectNumber);
      return;
    }

    if (!isNumber(price)) {
      await ctx.reply(en.notification.alarmMenu.incorrectPrice);
      return;
    }

    if (network) {
      const { updateAlarmNetworks } = await alarmsService({ ctx });
      await updateAlarmNetworks(price, network.id);

      await ctx.reply(en.addMoreQuestion, {
        reply_markup: agreementKeyboard,
      });
    }
  });

feature
  .filter((ctx) => ctx.session.step === "timezone")
  .on("message", async (ctx) => {
    const country = ctx.message.text || "";

    const currentCountry = countries.find(
      ({ name }) => name.toLowerCase() === country.toLowerCase()
    ) || {
      code: "",
    };

    if (!currentCountry.code) {
      return ctx.reply(en.notification.reminderMenu.incorrectCountry);
    }

    const parseCountry = getCountry(currentCountry.code);
    if (parseCountry?.timezones) {
      ctx.session.timezone = parseCountry.timezones.map(
        (item) => `${getFlagEmoji(currentCountry.code)} ${item}`
      );

      return ctx.reply(en.notification.reminderMenu.chooseTimezone, {
        reply_markup: timezoneMenu,
      });
    }
  });

feature
  .filter((ctx) => ctx.session.step === "notification")
  .callbackQuery(
    "yes",
    async (ctx) => await ctx.reply(en.notification.alarmMenu.addMorePrice)
  );

feature
  .filter((ctx) => ctx.session.step === "notification")
  .callbackQuery("no", async (ctx) => {
    ctx.session.alarmNetwork = undefined;

    await ctx.reply(en.notification.alarmMenu.alarmSaved, {
      reply_markup: alarmMenu,
    });
  });

feature.callbackQuery(/^deleteAlarm:/, async (ctx) => {
  const data = ctx.callbackQuery.data;
  // eslint-disable-next-line no-useless-escape
  const [alarmPriceId] = data.match(/\d{1,2}([\.,][\d{1,2}])?/g) || [];
  const { removeAlarmPrice } = alarmPricesService();
  await removeAlarmPrice(Number(alarmPriceId));
  ctx.session.step = "notification";

  await ctx.reply(en.notification.alarmMenu.alarmRemoved, {
    reply_markup: notificationMenu,
  });
});
