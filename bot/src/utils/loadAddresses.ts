import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { validation } from "@bot/utils/validation";
import { en } from "@bot/constants/en";
import { bech32 } from "bech32";
import { template } from "@bot/utils/template";
import { networksService, usersService, walletsService } from "@bot/services";
import { Context } from "@bot/types";

type TAddress = {
  address: string;
  name: string;
  networkId: number;
  userId: number;
};

export async function loadAddresses(
  path: string,
  ctx: Context
): Promise<Array<TAddress> | void | string> {
  const addresses: Array<TAddress> = [];
  if (!ctx.from?.id) return;
  const { getAllUserWallets } = walletsService(ctx);
  const { getNetwork } = networksService();
  const { getUser } = usersService();
  const userWallets = await getAllUserWallets();
  const user = await getUser({ telegramId: ctx.from.id });

  if (!user?.id) return;

  const parser = createReadStream(path).pipe(
    parse({ delimiter: ",", from_line: 2 })
  );

  for await (const record of parser) {
    const [address, name] = record;
    const parsedValue: string = address.replace(/\s+/g, "");

    if (!validation.isValidAddress(parsedValue)) {
      return en.wallet.bulkImportAddressInvalid;
    }

    const prefix = bech32.decode(address).prefix;
    const { network } = await getNetwork({ name: prefix });

    if (!validation.isValidChain(parsedValue)) {
      return template(en.wallet.bulkImportNetworkInvalid, {
        networkName: network.fullName,
      });
    }

    if (validation.isDuplicateAddress(userWallets, parsedValue)) {
      return template(en.wallet.bulkImportDuplicateAddress, {
        walletAddress: parsedValue,
      });
    }

    addresses.push({
      address: parsedValue,
      name,
      networkId: network.id,
      userId: user.id,
    });
  }

  return addresses;
}
