import { Context } from "@bot/types";
import { walletDao } from "@bot/dao";

export const walletsService = (ctx?: Context) => {
  const user = ctx?.local.user || {
    id: 0,
    notificationId: 0,
    telegramId: 0,
  };

  const createUserWallet = async (
    networkId: number,
    address: string,
    userId?: number
  ) => {
    return await walletDao.createWallet({
      data: {
        userId: !userId ? user.id : userId,
        networkId,
        address,
      },
    });
  };

  const getAllUserWallets = async () => {
    return await walletDao.getAllWallets({
      where: {
        userId: user.id,
      },
    });
  };

  const removeUserWallet = async (id: number) => {
    return await walletDao.removeWallet({
      where: {
        id,
      },
    });
  };

  return {
    createUserWallet,
    getAllUserWallets,
    removeUserWallet,
  };
};
