import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  createWallet: (args: Prisma.WalletCreateArgs) => prisma.wallet.create(args),

  updateWallet: (args: Prisma.WalletUpdateArgs) => prisma.wallet.update(args),

  bulkCreateWallets: (data: Array<Prisma.WalletCreateManyInput>) =>
    prisma.wallet.createMany({ data, skipDuplicates: true }),

  getAllWallets: (args: Prisma.WalletFindManyArgs) =>
    prisma.wallet.findMany(args),

  removeWallet: (args: Prisma.WalletDeleteArgs) => prisma.wallet.delete(args),

  removeAllWallet: (args: Prisma.WalletDeleteManyArgs) =>
    prisma.wallet.deleteMany(args),
});
