import { userDao } from "@bot/dao";
import { Context } from "@bot/types";

export const usersService = (ctx?: Context) => {
  const user = ctx?.local.user || {
    telegramId: 0,
  };

  const upsertUser = async (telegramId: number) => {
    return await userDao.upsertUser({
      where: {
        telegramId: telegramId,
      },
      create: {
        telegramId: telegramId,
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

  const getUser = async ({
    id,
    telegramId,
  }: {
    id?: number;
    telegramId?: number;
  }) => {
    const args = telegramId ? { telegramId } : { id };
    return await userDao.getUser({
      where: args,
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
