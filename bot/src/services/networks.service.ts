import { networkDao } from "@bot/dao";
import { ChainInfo } from "@bot/types/general";
import { config } from "@bot/chains";
import { cosmosConfig } from "@bot/chains/cosmos";

export const networksService = () => {
  const getNetwork = async ({
    networkId,
    name,
  }: {
    networkId?: number;
    name?: string;
  }) => {
    const network = (await networkDao.getNetwork({
      where: {
        id: networkId,
        name,
      },
    })) || { name: "", publicUrl: "", fullName: "", id: 0 };
    const chain: ChainInfo =
      config.find((item) => item.network === network.name) || cosmosConfig;
    const { tokenUnits, primaryTokenUnit } = chain;
    const publicUrl = network?.publicUrl || "";
    const denom = tokenUnits[primaryTokenUnit].display;

    return {
      network,
      publicUrl,
      denom,
      coingeckoId: chain.coingeckoId,
    };
  };

  const getAllNetworks = async () => {
    return await networkDao.getAllNetworks();
  };

  return {
    getNetwork,
    getAllNetworks,
  };
};
