import { networkDao } from "@bot/dao";

export const networksService = () => {
  const getNetwork = async ({
    networkId,
    name,
  }: {
    networkId?: number;
    name?: string;
  }) => {
    return await networkDao.getNetwork({
      where: {
        id: networkId,
        name,
      },
    });
  };

  const getAllNetworks = async () => {
    return await networkDao.getAllNetworks();
  };

  return {
    getNetwork,
    getAllNetworks,
  };
};
