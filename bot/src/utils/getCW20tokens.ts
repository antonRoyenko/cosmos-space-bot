import { CosmWasmClient } from "cosmwasm";

export async function getCW20tokens(tokenAddress: string, address: string) {
  try {
    const client = await CosmWasmClient.connect(
      "https://rpc-juno.itastakers.com:443"
    );
    const token = await client.queryContractSmart(tokenAddress, {
      balance: {
        address,
      },
    });

    return token.balance;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
