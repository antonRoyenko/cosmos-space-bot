import { Context } from "@bot/types";
import { walletDao } from "@bot/dao";
import { Prisma } from "@prisma/client";
import { decrypt } from "@bot/utils";

export const walletsService = (ctx?: Context) => {
  const user = ctx?.local.user || {
    id: 0,
    notificationId: 0,
    telegramId: 0,
  };

  const createUserWallet = async (
    {
      networkId,
      address,
      name,
      iv,
    }: {
      networkId: number;
      address: string;
      name: string;
      iv: string;
    },
    userId?: number
  ) => {
    return await walletDao.createWallet({
      data: {
        userId: !userId ? user.id : userId,
        name,
        networkId,
        address,
        iv,
      },
    });
  };

  const updateUserWallet = async ({
    walletId,
    address,
    iv,
  }: {
    walletId: number;
    address: string;
    iv: string;
  }) => {
    return await walletDao.updateWallet({
      where: {
        id: walletId,
      },
      data: {
        address,
        iv,
      },
    });
  };

  const bulkCreateUserWallet = async (
    data: Array<Prisma.WalletCreateManyInput>
  ) => {
    return await walletDao.bulkCreateWallets(data);
  };

  const getAllUserWallets = async (id?: number) => {
    const userId = id ?? user.id;
    const wallets = await walletDao.getAllWallets({
      where: {
        userId: userId,
      },
    });

    return wallets.map((wallet) => {
      if (!wallet.iv || !ctx) return wallet;
      const encryptedWallet = decrypt(
        { iv: wallet.iv, encryptedData: wallet.address },
        ctx.session.walletPassword
      );

      return {
        ...wallet,
        address: encryptedWallet,
      };
    });
  };

  const removeUserWallet = async (id: number) => {
    return await walletDao.removeWallet({
      where: {
        id,
      },
    });
  };

  const removeAllUserWallet = async (id: number) => {
    return await walletDao.removeAllWallet({
      where: {
        userId: id,
      },
    });
  };

  return {
    createUserWallet,
    bulkCreateUserWallet,
    getAllUserWallets,
    removeUserWallet,
    updateUserWallet,
    removeAllUserWallet,
  };
};
