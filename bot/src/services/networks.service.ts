import { networkDao } from "@bot/dao";

export const resourcesService = () => {
  const getNetwork = async (networkId: number) => {
    return await networkDao.getNetwork({
      where: {
        id: networkId,
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
