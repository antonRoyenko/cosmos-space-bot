import { logHandle } from "@bot/helpers/logging";
import { usersService } from "@bot/services";
import { currencyMenu } from "@bot/menu";
import { router } from "@bot/middlewares";

export const feature = router.route("setup");

feature.command("start", logHandle("handle /start"), async (ctx) => {
  await ctx.reply(
    "Hello and welcome, I'm your cosmos bot, I'll help you \n" +
      "manage your assets and track important for you data. \n" +
      "Please enter your any cosmos wallet"
  );
});

feature.on("message:text", logHandle("handle wallet"), async (ctx) => {
  console.log(543, ctx.session.step);
  await ctx.replyWithChatAction("typing");
  const { id: telegramId } = ctx.from;

  ctx.local.user = await usersService.updateByTelegramId(telegramId, {
    data: { wallets: ctx.message.text },
  });

  await ctx.reply("Check out this menu:", { reply_markup: currencyMenu });
});
