import { Middleware } from "grammy";
import { Context } from "@bot/types";
import { walletDao } from "@bot/dao";
import { encrypt, validation } from "@bot/utils";
import { walletsService } from "@bot/services";

export const middleware = (): Middleware<Context> => async (ctx, next) => {
  const user = ctx.local.user;
  const { updateUserWallet } = walletsService(ctx);
  console.log(1, user, ctx.session.isWalletsMigrated);
  if (typeof user === "undefined" || ctx.session.isWalletsMigrated)
    return next();

  const wallets = await walletDao.getAllWallets({
    where: {
      userId: user.id,
    },
  });

  for (let i = 0; i < wallets.length; i++) {
    if (i + 1 === wallets.length) {
      ctx.session.isWalletsMigrated = true;
    }

    const address = wallets[i].address;
    if (validation.isValidAddress(address)) {
      const { iv, encryptedData } = encrypt(
        address,
        ctx.session.walletPassword
      );
      console.log(2, address, ctx.session.walletPassword, iv, encryptedData);

      updateUserWallet({
        walletId: wallets[i].id,
        address: encryptedData,
        iv,
      });
    }
  }

  return next();
};
