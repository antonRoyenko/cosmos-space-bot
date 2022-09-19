import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const networkData: Prisma.NetworkCreateInput[] = [
  {
    name: "agoric",
    fullName: "Agoric",
    publicUrl: "https://api.agoric.sgtstake.com/",
    keplrId: "agoric",
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
    name: "akash",
    fullName: "Akash",
    publicUrl: "https://akash.api.ping.pub/",
    keplrId: "akash",
    resource: {
      create: {
        site: "https://akash.network",
        discord: "https://discord.com/invite/akash",
        twitter: "https://twitter.com/akashnet",
        youtube: "https://www.youtube.com/akashnetwork",
        github: "https://github.com/ovrclk",
        telegram: "https://t.me/AkashNW",
      },
    },
  },
  {
    name: "mantle",
    fullName: "AssetMantle",
    publicUrl: "https://api.assetmantle.nodestake.top/",
    resource: {
      create: {
        site: "https://assetmantle.one",
        discord: "https://discord.gg/BSdBQ4495d",
        twitter: "https://twitter.com/AssetMantle",
        blog: "https://assetmantle.medium.com",
        github: "https://github.com/AssetMantle",
        telegram: "https://t.me/assetmantlechat",
      },
    },
  },
  {
    name: "chihuahua",
    fullName: "Chihuahua",
    publicUrl: "https://api.chihuahua.wtf/",
    resource: {
      create: {
        site: "https://www.chihuahua.wtf",
        discord: "https://discord.gg/chihuahua",
        twitter: "https://t.me/chihuahua_cosmos",
        github: "https://github.com/chihuahuachain",
        telegram: "https://t.me/chihuahua_cosmos",
        blog: "https://medium.com/@chihuahuachain",
      },
    },
  },
  {
    name: "band",
    fullName: "Band Protocol",
    publicUrl: "https://laozi1.bandchain.org/api/",
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
    publicUrl: "https://lcd.explorebitsong.com/",
    resource: {
      create: {
        site: "https://bitsong.io",
        discord: "https://discord.com/invite/mZC9Yk3",
        twitter: "https://twitter.com/BitSongOfficial",
        blog: "https://bitsongofficial.medium.com/",
        github: "https://github.com/BitSongOfficial",
        reddit: "https://www.reddit.com/r/bitsong",
        telegram: "https://t.me/BitSongOfficial",
      },
    },
  },
  // {
  //   name: "bostrom",
  //   fullName: "Bostrom",
  //   publicUrl: "https://lcd.bostrom.cybernode.ai",
  //   resource: {
  //     create: {
  //       site: "https://cyb.ai",
  //       twitter: "https://twitter.com/cyber_devs",
  //       github: "github.com/cybercongress",
  //       telegram: "https://t.me/cyber_russian_community",
  //     },
  //   },
  // },
  {
    name: "cheqd",
    fullName: "Chheqd",
    publicUrl: "https://api.cheqd.net/",
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
    publicUrl: "https://rest.comdex.one/",
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
    keplrId: "cosmos-hub",
    publicUrl: "https://cosmos.api.ping.pub/",
    resource: {
      create: {
        site: "https://cosmos.network",
        discord: "https://discord.gg/cosmosnetwork",
        twitter: "https://twitter.com/cosmos",
        youtube: "https://www.youtube.com/c/CosmosProject",
        blog: "https://blog.cosmos.network/",
        github: "https://github.com/cosmos",
        reddit: "https://www.reddit.com/r/cosmosnetwork",
      },
    },
  },
  {
    name: "cre",
    fullName: "Crescent",
    publicUrl: "https://crescent-api.polkachu.com/",
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
    publicUrl: "https://api.mainnet.desmos.network/",
    resource: {
      create: {
        site: "https://www.desmos.network",
        discord: "https://discord.desmos.network",
        twitter: "https://twitter.com/DesmosNetwork",
        youtube: "https://www.youtube.com/channel/UCWsStillLytB4OyWu3-vS4w",
        blog: "https://medium.com/desmosnetwork",
        github: "https://github.com/desmos-labs",
        reddit: "https://www.reddit.com/r/DesmosNetwork",
      },
    },
  },
  {
    name: "emoney",
    fullName: "E-money.com",
    publicUrl: "https://emoney.validator.network/api/",
    keplrId: "e-money",
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
    publicUrl: "https://evmos-api.polkachu.com/",
    keplrId: "evmos",
    resource: {
      create: {
        site: "https://evmos.org/",
        discord: "https://discord.gg/evmos",
        twitter: "https://twitter.com/EvmosOrg",
        blog: "https://medium.com/evmos",
        github: "https://github.com/tharsis/evmos",
        reddit: "https://www.reddit.com/r/EVMOS",
      },
    },
  },
  {
    name: "juno",
    fullName: "Juno",
    publicUrl: "https://juno-api.polkachu.com/",
    keplrId: "juno",
    resource: {
      create: {
        site: "https://www.junonetwork.io",
        discord: "https://discord.gg/Juno",
        twitter: "https://twitter.com/JunoNetwork",
        blog: "https://medium.com/@JunoNetwork",
        github: "https://github.com/CosmosContracts",
        telegram: "https://t.me/JunoNetwork",
      },
    },
  },
  {
    name: "like",
    fullName: "LikeCoin",
    publicUrl: "https://mainnet-node.like.co/",
    resource: {
      create: {
        site: "https://about.like.co",
        discord: "https://discord.com/invite/likecoin",
        twitter: "https://twitter.com/likecoin",
        blog: "https://medium.com/likecoin",
        github: "https://github.com/likecoin",
        reddit: "https://www.reddit.com/r/LikeCoin",
      },
    },
  },
  {
    name: "osmo",
    fullName: "Osmosis",
    publicUrl: "https://osmosis-api.polkachu.com/",
    keplrId: "osmosis",
    resource: {
      create: {
        site: "https://osmosis.zone",
        discord: "https://discord.com/invite/osmosis",
        twitter: "https://twitter.com/osmosiszone",
        blog: "https://medium.com/osmosis",
        github: "https://github.com/osmosis-labs",
        reddit: "https://www.reddit.com/r/OsmosisLab",
      },
    },
  },
  {
    name: "pb",
    fullName: "Provenance",
    publicUrl: "https://api.provenance.io/",
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
    name: "persistence",
    fullName: "Persistence",
    publicUrl: "https://rest.core.persistence.one/",
    keplrId: "persistence",
    resource: {
      create: {
        site: "https://persistence.one",
        discord: "https://discord.gg/qXRmTTGcYD",
        twitter: "https://twitter.com/PersistenceOne",
        youtube:
          "https://www.youtube.com/channel/UC5wqI1ZRdkCjWWVOCQdhxLQ/featured",
        blog: "https://blog.persistence.one",
        github: "https://github.com/persistenceOne",
        reddit: "https://www.reddit.com/r/PersistenceOne",
        telegram: "https://t.me/PersistenceOne",
      },
    },
  },
  {
    name: "regen",
    fullName: "Regen Network",
    publicUrl: "https://regen.api.ping.pub/",
    keplrId: "regen",
    resource: {
      create: {
        site: "https://www.regen.network",
        discord: "https://discord.gg/regen-network",
        twitter: "http://twitter.com/regen_network",
        youtube: "https://www.youtube.com/channel/UCICD2WukTY0MbQdQ9Quew3g",
        blog: "https://medium.com/regen-network",
        github: "https://github.com/regen-network",
        reddit: "https://www.reddit.com/r/DesmosNetwork",
        telegram: "http://t.me/regennetwork_public",
      },
    },
  },
  {
    name: "rizon",
    fullName: "Rizon",
    publicUrl: "https://restapi.rizon.world/",
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
    name: "secret",
    fullName: "Secret network",
    publicUrl: "https://api.scrt.network/",
    keplrId: "secret-network",
    resource: {
      create: {
        site: "https://scrt.network",
        discord: "https://discord.com/invite/SJK32GY",
        twitter: "https://twitter.com/SecretNetwork",
        youtube: "https://www.youtube.com/channel/UCZPqj7h7mzjwuSfw_UWxQPw",
        blog: "https://medium.com/@secretnetwork",
        github: "https://github.com/SecretFoundation",
        telegram: "https://t.me/SCRTcommunity",
      },
    },
  },
  {
    name: "sif",
    fullName: "Sifchain",
    publicUrl: "https://api.sifchain.finance/",
    keplrId: "sifchain",
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
  {
    name: "stars",
    fullName: "Stargaze",
    publicUrl: "https://rest.stargaze-apis.com/",
    keplrId: "stargaze",
    resource: {
      create: {
        site: "https://www.stargaze.zone",
        discord: "https://discord.gg/stargaze",
        twitter: "https://twitter.com/stargazezone",
        github: "https://github.com/public-awesome",
        telegram: "https://t.me/joinchat/ZQ95YmIn3AI0ODFh",
      },
    },
  },
  {
    name: "terra",
    fullName: "Terra",
    publicUrl: "https://fcd.terra.dev/",
    resource: {
      create: {
        site: "https://www.terra.money",
        discord: "https://terra.sc/discord",
        twitter: "https://twitter.com/terra_money",
        blog: "https://medium.com/terra-money",
        github: "https://github.com/terra-money",
        telegram: "https://t.me/TerraNetworkLobby",
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
