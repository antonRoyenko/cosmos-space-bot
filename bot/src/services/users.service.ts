import { userDao } from "@bot/dao";
import { Context } from "@bot/types";

export const usersService = (ctx: Context) => {
  const user = ctx.local.user || {
    telegramId: 0,
  };

  const upsertUser = async () => {
    return await userDao.upsertUser({
      where: {
        telegramId: user.telegramId,
      },
      create: {
        telegramId: user.telegramId,
        notification: { create: {} },
      },
      update: {},
    });
  };

  const updateUser = async ({
    timezone,
    networkId,
  }: {
    timezone?: string;
    networkId?: number;
  }) => {
    return await userDao.updateUser({
      where: {
        telegramId: user.telegramId,
      },
      data: {
        timezone,
        networkId,
      },
    });
  };

  const getUser = async (id: number) => {
    return await userDao.getUser({
      where: {
        telegramId: user.telegramId,
        id,
      },
    });
  };

  const getAllUser = async () => {
    return await userDao.getAllUser();
  };

  return {
    upsertUser,
    updateUser,
    getUser,
    getAllUser,
  };
};
