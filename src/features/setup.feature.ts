import { logHandle } from "@bot/helpers/logging";
import { usersService } from "@bot/services";
import { currentMenu } from "@bot/menu";
import { router } from "@bot/middlewares";

export const feature = router.route("setup");

feature.command("start", logHandle("handle /start"), async (ctx) => {
  ctx.session.step = "setup";
  await ctx.reply(
    "Hello and welcome, I'm your cosmos bot, I'll help you \n" +
      "manage your assets and track important for you data. \n" +
      "Please choose network",
    { reply_markup: currentMenu }
  );
});

feature
  .filter((ctx) => ctx.session.step === "setup")
  .on("message:text", logHandle("handle wallet"), async (ctx) => {
    await ctx.replyWithChatAction("typing");
    const { id: telegramId } = ctx.from;

    ctx.local.user = await usersService.updateByTelegramId(telegramId, {
      data: { wallets: ctx.message.text },
    });

    ctx.session.currentWallets = [ctx.message.text];
    ctx.session.step = "home";
    return ctx.reply("Perfect! Now you can use any of commands /help");
  });
