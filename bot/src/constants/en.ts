export const en = {
  aboutBot:
    "Statistic, Personal assets, Notification in Cosmos-based networks.",
  descriptionBot:
    "This bot can send Crypto prices, Wallet(s) assets, and different types of notifications",
  start: {
    command: "start",
    text:
      "I'm the @CosmosSpaceBot \n\n" +
      "<b>I have a lot of useful functions such as:</b>  \n\n" +
      "<i>Manage wallets</i>\n" +
      "<i>View cryptocurrency assets</i>\n" +
      "<i>Network statistics</i>\n" +
      "<i>Show active proposals</i>\n" +
      "<i>List of resources about networks</i>\n" +
      "<i>Daily reminder</i>\n" +
      "<i>Price alert</i>\n" +
      "<i>Subscribe to networks proposals</i>\n\n" +
      "/help get full command list \n\n" +
      "Reach Out to the Developer @ReactiveGuy",
  },
  help: {
    command: "help",
    text:
      "/wallet - Manage wallets \n" +
      "/assets - View cryptocurrency Assets \n" +
      "/statistic - View one of the network statistic \n" +
      "/notification - Use notifications to get alerts \n" +
      "/proposals - View proposals in different chains" +
      "/resources - The list of resources about one of the Network \n" +
      "/help - Full command list \n" +
      "/about - About bot \n" +
      "/support - Support me \n",
  },
  wallet: {
    command: "wallet",
    invalidFormat:
      "Format should be: (If you don't want, fill in /reset) \n\n" +
      "Address\n" +
      "Wallet name\n\n",
    invalidAddress:
      "Enter a valid address. If you don't want enter, fill in /reset",
    invalidNetwork:
      "Network %{networkName} is not supported, enter other chain. If you don't want enter, fill in /reset",
    duplicateAddress:
      "You already have this wallet. If you don't want enter, fill in /reset",
    addMore: "Add one more wallet",
    success: "Perfect! Use /assets command",
    menu: {
      title: "Choose the Action",
      keplr: "🔑 Add Via Keplr",
      manually: "👇 Add Manually",
      bulkImport: "📁 Add via .csv",
      bulkExport: "📎 Export addresses",
      list: "💳 List of Wallets",
      delete: "🗑 Delete a wallet",
    },
    addAddress:
      "Enter your address in format:\n\n" + "Address\n" + "Wallet name \n",
    addBulkWallet:
      "Send .csv file with wallet addresses, example of .csv file above",
    showWallet: "%{number} <b>%{name}</b> - %{address}",
    deleteWallet: "Choose the wallet that you want to remove",
    removedWallet: "Wallet %{address} was successful removed",
    emptyWallet: "You don't have wallets, please add it",
    bulkImportAddressInvalid:
      "Check addresses in file and reload file. If you don't want, fill in /reset",
    bulkImportNetworkInvalid:
      "Network %{networkName} is not supported, fix and reload file. If you don't want, fill in /reset",
    bulkImportDuplicateAddress:
      "Wallet %{walletAddress} duplicated, remove it and reload file. If you don't want, fill in /reset",
    incorrectCSV: "Incorrect .csv file format, should be comma separator",
    successfulImport: "File was successful uploaded",
  },
  assets: {
    command: "assets",
    menu: {
      title: "Choose wallet(s)",
      all: "Total amount",
      walletDescription:
        "<b>Wallet %{number}:</b> <i>%{address}</i> \n" +
        "\n<b>Balance in %{denom}: </b>\n\n" +
        "<i>👉 Available</i> — %{available} \n\n" +
        "<i>💸 Delegated</i> — %{delegate} \n\n" +
        "<i>🔐 Unbonding</i> — %{unbonding} \n\n" +
        "<i>🤑 Staking Reward</i> — %{reward} \n\n" +
        "<b>Total %{denom}</b> — %{totalCrypto} \n" +
        "<b>Total USD</b> — 💲%{total} \n\n" +
        "<b>CW20 tokens: </b> \n%{cw20}\n" +
        "<b>P&L:</b> \n" +
        "▫️ <i>For today</i> %{firstAmount}%{denom} (%{firstPercent}%) \n\n" +
        "▫️ <i>In 7 days</i> %{seventhAmount}%{denom} (%{seventhPercent}%) \n\n" +
        "▫️ <i>In 14 days</i> %{seventhAmount}%{denom} (%{fourteenthPercent}%) \n\n" +
        "▫️ <i>In 30 days</i> %{thirtyAmount}%{denom} (%{thirtyPercent}%) \n\n",
      total: "%{number} <i>%{networkName}</i> — <b>%{amount}</b> \n\n",
    },
  },
  notification: {
    command: "notification",
    menu: {
      title: "Choose the Action",
      reminder: "🗓 Set Up Daily Report Reminders",
      alarm: "⏰ Crypto price alert",
      proposals: "📝 Proposals",
    },
    reminderMenu: {
      title: "Choose the action",
      networks: "🛰 Networks",
      time: "🕕 Time",
      timezone: "🌎 Timezone",
      enabled: " 🔔 Enabled",
      disabled: "🔕 Disabled",
      chooseNetwork: "Please, choose network",
      chooseReminderTime: "Please, choose alarm time",
      fillCountry: "Fill in the country to detect your timezone",
      incorrectCountry:
        "Incorrect name country, please fill full country name or country code, if you don't want enter, put in /reset",
      chooseTimezone: "Please, Choose timezone",
    },
    alarmMenu: {
      title: "Choose the action",
      add: "➕ Add alert",
      delete: "➖ Delete alert",
      list: "📃 Alerts list",
      enabled: " 🔔 Enabled",
      disabled: "🔕 Disabled",
      chooseNetworkTitle: "Choose Network",
      alarmSaved: "Alarm saved",
      alarmRemoved: "Alarm removed",
      incorrectNumber:
        "Number should be without $, if you don't want enter, fill in /reset",
      incorrectPrice:
        "Price is incorrect, if you don't want enter, fill in /reset",
      positivePrice:
        "Price should be positive, if you don't want enter, fill in /reset",
      addMorePrice: "Add one more price alarm",
      coinPrice: "%{name} price - %{price}",
      removeWalletTitle: "Choose the wallet that you want to remove",
      alarmList: "You have alarms(s): \n",
      alarmListItem: "%{networkName} at price(s) — %{prices}$ \n",
      alarmPriceInput:
        "Current %{networkName} price - $%{price} is, please put alarm price",
    },
    proposalMenu: {
      title: "Choose the network(s)",
    },
  },
  resources: {
    command: "resources",
    menu: {
      title: "Choose network",
      resourceItem: "🔘 <b>%{item}:</b> %{link} \n",
    },
  },
  statistic: {
    command: "statistic",
    menu: {
      title: "Choose the Network",
      statisticDescription:
        "<b>%{denom} Price: 🔥 💲%{price} 🔥</b> \n\n" +
        "<i>💸 APR</i> - %{apr} \n\n" +
        "<i>📊 Inflation</i> - %{inflation}% \n\n" +
        "<i>🔝 Height</i> - %{height} \n\n" +
        "<i>🌐 Community Pool</i> - %{communityPool} \n\n" +
        "<b>Price change</b>:\n\n" +
        "▫️ <i>For today</i> - %{firstPercent}% \n\n" +
        "▫️ <i>In 7 days</i> - %{seventhPercent}% \n\n" +
        "▫️ <i>In 14 days</i> - %{fourteenthPercent}% \n\n" +
        "▫️ <i>In 30 days</i> - %{thirtyPercent}% \n\n" +
        "<b>Tokenomics</b>: \n\n" +
        "<i>🔒 Bonded</i> - %{bonded} \n\n" +
        "<i>🔐 Unbonding</i> - %{unbonding} \n\n" +
        "<i>🔓 Unbonded</i> - %{unbonded} \n",
      unknownPrice: "%{networkName} - &#60;price is unknown&#62;",
    },
  },
  proposals: {
    command: "proposals",
    menu: {
      title: "Choose the Network",
      proposalDescriptionTitle: "<b>Proposal %{number}</b> \n\n",
      proposalDescription: "%{title}  \n\n" + "%{description} \n\n",
      proposalDescriptionLink:
        "https://wallet.keplr.app/chains/%{keplrId}/proposals/%{proposalId} \n\n",
      noProposal: "🙅‍♂️ No active proposal",
    },
  },
  cron: {
    reminderTitle: "⏰⏰⏰ Price reminder at time %{date} ⏰⏰⏰ \n\n",
    reminderItem: "%{networkName} — $%{price} \n",
    alarmTitle: "🚨🚨🚨 Alarm❗ %{networkName} price — $%{price} 🚨🚨🚨",
    newProposal:
      "🚨 New proposal from %{networkName}❗🚨 \n\n" +
      "%{title}  \n\n" +
      "%{description}",
  },
  support: {
    command: "support",
    title:
      "I'll be very pleased if you support me with some donation ❤️.\n" +
      "I'll continue develop useful tools for our Cosmos ecosystem. \n" +
      "ATOM: cosmos1te6z5n9mpz27wc2yyfrssdc88pztca9mzarmgd \n" +
      "ETH: 0xB2Df04F4536B99666E3968d14761bb890d002Df3 \n" +
      "BSC: 0xB2Df04F4536B99666E3968d14761bb890d002Df3",
  },
  about: {
    command: "about",
    title:
      "I hope this bot you is useful for you. \n\n" +
      "If you have question or proposals how I can improve it " +
      "you can always reach me out. \n" +
      "Here is full <a href='https://medium.com/@anton.royenko/telegram-bot-for-cosmos-ecosystem-290b32dae41a'>article</a> " +
      "about the bot implementation and <a href='https://github.com/antonRoyenko/cosmos-space-bot'>Github</a>",
  },
  reset: {
    command: "reset",
    title: "Step reseted",
  },
  unknownRoute:
    "Sorry, I don't understand you, please use /help to get the full command list",
  addMoreQuestion: "Do you want add more?",
  back: "<< Go back",
};
