import { resourceDao } from "@bot/dao";

export const resourcesService = () => {
  const getResource = async (resourceId: number) => {
    return await resourceDao.getResource({
      where: {
        id: resourceId,
      },
    });
  };

  return {
    getResource,
  };
};
