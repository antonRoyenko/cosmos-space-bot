import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const networkData: Prisma.NetworkCreateInput[] = [
  {
    name: "agoric",
    fullName: "Agoric",
    publicUrl: "https://gql.agoric.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.agoric.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://agoric.com",
        discord: "https://agoric.com/discord",
        twitter: "https://twitter.com/agoric",
        youtube: "https://www.youtube.com/c/agoric",
        blog: "https://medium.com/agoric",
        github: "https://github.com/Agoric",
        telegram: "https://agoric.com/telegram",
      },
    },
  },
  {
    name: "mantle",
    fullName: "AssetMantle",
    publicUrl: "https://gql.assetmantle.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.assetmantle.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://assetmantle.one",
        discord: "https://discord.gg/BSdBQ4495d",
        twitter: "https://twitter.com/AssetMantle",
        blog: "https://assetmantle.medium.com/",
        github: "https://github.com/AssetMantle",
        telegram: "https://t.me/assetmantlechat",
      },
    },
  },
  {
    name: "band",
    fullName: "Band Protocol",
    publicUrl: "https://gql.band.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.band.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://bandprotocol.com",
        discord: "https://discord.com/invite/3t4bsY7",
        twitter: "https://twitter.com/BandProtocol",
        blog: "https://medium.com/bandprotocol",
        github: "https://github.com/bandprotocol",
        telegram: "https://t.me/bandprotocol",
      },
    },
  },
  {
    name: "bitsong",
    fullName: "BitSong",
    publicUrl: "https://gql.bitsong.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.bitsong.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://bitsong.io",
        discord: "https://discord.com/invite/mZC9Yk3",
        twitter: "https://twitter.com/BitSongOfficial",
        blog: "https://bitsongofficial.medium.com/",
        github: "https://github.com/BitSongOfficial",
        reddit: "https://www.reddit.com/r/bitsong/",
        telegram: "https://t.me/BitSongOfficial",
      },
    },
  },
  {
    name: "cheqd",
    fullName: "Chheqd",
    publicUrl: "https://explorer-gql.cheqd.io/v1/graphql",
    wsPublicUrl: "wss://explorer-gql.cheqd.io/v1/graphql",
    resource: {
      create: {
        site: "https://cheqd.io/",
        discord: "https://cheqd.link/discord",
        twitter: "https://twitter.com/cheqd_io",
        blog: "https://blog.cheqd.io/",
        github: "https://github.com/cheqd",
        telegram: "https://t.me/cheqd",
        youtube: "https://www.youtube.com/channel/UCBUGvvH6t3BAYo5u41hJPzw",
      },
    },
  },
  {
    name: "comdex",
    fullName: "Comdex",
    publicUrl: "https://gql.comdex.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.comdex.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://comdex.one",
        discord: "https://bit.ly/ComdexOfficialDiscord",
        twitter: "https://twitter.com/ComdexOfficial",
        blog: "https://blog.comdex.one/",
        github: "https://github.com/comdex-official",
        telegram: "https://t.me/ComdexChat",
        youtube: "https://www.youtube.com/c/ComdexOfficial",
      },
    },
  },
  {
    name: "cosmos",
    fullName: "Cosmos Hub",
    publicUrl: "https://gql.cosmos.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.cosmos.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://cosmos.network",
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
    name: "cre",
    fullName: "Crescent",
    publicUrl: "https://gql.crescent.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.crescent.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://crescent.network/",
        discord: "https://discord.com/invite/ZUfrDnSX8G",
        twitter: "https://twitter.com/CrescentHub",
        blog: "https://crescentnetwork.medium.com/",
        github: "https://github.com/crescent-network",
        telegram: "https://t.me/crescentnetwork",
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
        site: "https://www.desmos.network",
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
    name: "emoney",
    fullName: "E-money.com",
    publicUrl: "https://gql.emoney.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.emoney.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://e-money.com/",
        twitter: "https://twitter.com/emoney_com",
        blog: "https://medium.com/e-money-com",
        github: "https://github.com/e-money",
        telegram: "https://t.me/emoney_com",
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
    name: "like",
    fullName: "LikeCoin",
    publicUrl: "https://gql.likecoin.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.likecoin.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://about.like.co",
        discord: "https://discord.com/invite/likecoin",
        twitter: "https://twitter.com/likecoin",
        blog: "https://medium.com/likecoin",
        github: "https://github.com/likecoin",
        reddit: "https://www.reddit.com/r/LikeCoin/",
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
  {
    name: "pb",
    fullName: "Provenance",
    publicUrl: "https://gql.provenance.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.provenance.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://www.provenance.io",
        discord: "https://discord.gg/kNZC8nwCFP",
        twitter: "https://twitter.com/provenancefdn",
        blog: "https://medium.com/@provenanceblockchain",
        github: "https://github.com/provenance-io/",
      },
    },
  },
  {
    name: "regen",
    fullName: "Regen Network",
    publicUrl: "https://gql.regen.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.regen.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://www.regen.network",
        discord: "https://discord.gg/regen-network",
        twitter: "http://twitter.com/regen_network",
        youtube: "https://www.youtube.com/channel/UCICD2WukTY0MbQdQ9Quew3g",
        blog: "https://medium.com/regen-network",
        github: "https://github.com/regen-network/",
        reddit: "https://www.reddit.com/r/DesmosNetwork/",
        telegram: "http://t.me/regennetwork_public",
      },
    },
  },
  {
    name: "rizon",
    fullName: "Rizon",
    publicUrl: "https://gql.rizon.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.rizon.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://rizon.world",
        discord: "https://discord.com/invite/DvZFA7mpuX",
        twitter: "https://twitter.com/hdac_rizon",
        youtube: "https://www.youtube.com/c/HdacTechnologyOfficial",
        blog: "https://medium.com/hdac",
        github: "https://github.com/rizon-world",
        telegram: "https://t.me/rizon_atolo_eng",
      },
    },
  },
  {
    name: "sif",
    fullName: "Sifchain",
    publicUrl: "https://gql.sifchain.forbole.com/v1/graphql",
    wsPublicUrl: "wss://gql.sifchain.forbole.com/v1/graphql",
    resource: {
      create: {
        site: "https://www.sifchain.finance",
        discord: "https://discord.gg/sifchain",
        twitter: "https://twitter.com/sifchain",
        blog: "https://medium.com/sifchain-finance",
        github: "https://github.com/Sifchain",
        telegram: "https://t.me/sifchain",
      },
    },
  },
];

async function main() {
  console.log(`start remove all data ...`);
  await prisma.network.deleteMany({});
  console.log(`Removing finished ...`);
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
