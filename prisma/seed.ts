import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const networkData: Prisma.NetworkCreateInput[] = [
  {
    name: "cosmos",
    fullName: "Cosmos Hub",
    publicUrl: "https://gql.cosmos.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.cosmos.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://cosmos.network/",
        discord: "https://discord.gg/cosmosnetwork",
        twitter: "https://twitter.com/cosmos",
        youtube: "https://www.youtube.com/c/CosmosProject",
        blog: "https://blog.cosmos.network/",
        github: "https://github.com/cosmos",
        reddit: "https://www.reddit.com/r/cosmosnetwork/",
      },
    },
  },
  {
    name: "desmos",
    fullName: "Desmos",
    publicUrl: "https://gql.desmos.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.desmos.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://www.desmos.network/",
        discord: "https://discord.desmos.network/",
        twitter: "https://discord.desmos.network/",
        youtube: "https://www.youtube.com/channel/UCWsStillLytB4OyWu3-vS4w/",
        blog: "https://medium.com/desmosnetwork",
        github: "https://github.com/desmos-labs",
        reddit: "https://www.reddit.com/r/DesmosNetwork/",
      },
    },
  },
  {
    name: "evmos",
    fullName: "Evmos",
    publicUrl: "https://gql.evmos.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.evmos.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://evmos.org/",
        discord: "https://discord.gg/evmos",
        twitter: "https://twitter.com/EvmosOrg",
        blog: "https://medium.com/evmos",
        github: "https://github.com/tharsis/evmos",
        reddit: "https://www.reddit.com/r/EVMOS/",
      },
    },
  },
  {
    name: "osmo",
    fullName: "Osmosis",
    publicUrl: "https://gql.osmosis.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.osmosis.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://osmosis.zone/",
        discord: "https://discord.com/invite/osmosis",
        twitter: "https://twitter.com/osmosiszone",
        blog: "https://medium.com/osmosis",
        github: "https://github.com/osmosis-labs",
        reddit: "https://www.reddit.com/r/OsmosisLab/",
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of networkData) {
    const network = await prisma.network.create({
      data: u,
    });
    console.log(`Created network: ${network.name}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
