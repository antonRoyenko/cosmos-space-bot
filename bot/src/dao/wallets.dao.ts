import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  createWallet: (args: Prisma.WalletCreateArgs) => prisma.wallet.create(args),

  getAllWallets: (args: Prisma.WalletFindManyArgs) =>
    prisma.wallet.findMany(args),

  removeWallet: (args: Prisma.WalletDeleteArgs) => prisma.wallet.delete(args),
});
