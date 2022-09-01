export const en = {
  aboutBot:
    "Statistic, Personal assets, Notification in Cosmos-based networks.",
  descriptionBot:
    "This bot can send Crypto prices, Wallet(s) assets, and different types of notifications",
  start: {
    command: "start",
    text:
      "I'm the @CosmosSpaceBot \n\n" +
      "/help get full command list \n\n" +
      "Reach Out to the Developer @ReactiveGuy",
  },
  help: {
    command: "help",
    text:
      "/wallet - Manage cryptocurrencies in your wallet \n" +
      "/assets - View and Manage Digital Assets \n" +
      "/statistic - View one of the network statistic \n" +
      "/notification - Use notifications to get alerts \n" +
      "/resources - The list of resources about one of the Network \n" +
      "/help - full command list",
  },
  wallet: {
    command: "wallet",
    invalidAddress: "Enter a valid address",
    invalidNetwork: "This network is not supported",
    duplicateAddress: "You already have this wallet",
    addMore: "Add one more wallet",
    success: "Perfect! Use /assets command",
    menu: {
      title: "Choose the Action",
      keplr: "🔑 Add Via Keplr",
      manually: "👇 Add Manually",
      list: "💳 List of Wallets",
      delete: "🗑 Delete a wallet",
    },
    addAddress: "Enter your address",
    showWallet: "Wallet: %{number} - %{address}",
    deleteWallet: "Choose the wallet that you want to remove",
  },
  assets: {
    command: "assets",
    menu: {
      title: "Choose wallet(s)",
      all: "All wallets",
      walletDescription:
        "<b>Wallet %{number}:</b> <i>%{address}</i> \n" +
        "\n<b>Balance in %{denom}: </b>\n\n" +
        "<i>👉 Available</i> — %{available} \n\n" +
        "<i>💸 Delegated</i> — %{delegate} \n\n" +
        "<i>🔐 Unbonding</i> — %{unbonding} \n\n" +
        "<i>🤑 Staking Reward</i> — %{reward} \n\n" +
        "<b>Total %{denom}</b> — %{totalCrypto} \n" +
        "<b>Total USD</b> — 💲%{total} \n\n" +
        "<b>P&L:</b> \n" +
        "▫️ <i>For today</i> %{firstAmount}%{denom} (%{firstPercent}%) \n\n" +
        "▫️ <i>In 7 days</i> %{seventhAmount}%{denom} (%{seventhPercent}%) \n\n" +
        "▫️ <i>In 14 days</i> %{seventhAmount}%{denom} (%{fourteenthPercent}%) \n\n" +
        "▫️ <i>In 30 days</i> %{thirtyAmount}%{denom} (%{thirtyPercent}%) \n\n",
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
      incorrectCountry: "Incorrect name country",
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
      incorrectNumber: "Number should be without $",
      incorrectPrice: "Price is incorrect",
      addMorePrice: "Add one more price alarm",
      coinPrice: "%{name} price - %{price}",
      removeWalletTitle: "Choose the wallet that you want to remove",
      alarmList: "You have alarms(s): \n",
      alarmListItem: "%{networkName} at price(s) — %{prices}$ \n",
      alarmPriceInput:
        "Current %{networkName} price - %{price} is, please put alarm price",
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
        "<i>💸 APR</i> - %{apr}% \n\n" +
        "<i>📊 Inflation</i> - %{inflation}% \n\n" +
        "<i>🔝 Height</i> - %{height} \n\n" +
        "<i>🌐 Community Pool</i> - %{communityPool} \n\n" +
        "<b>Price change</b>:\n\n" +
        "▫️ <i>For today</i> - %{firstPercent}% \n\n" +
        "▫️ <i>In 7 days</i> - %{seventhPercent}% \n\n" +
        "▫️ <i>In 14 days</i> - %{fourteenthPercent}% \n\n" +
        "▫️ <i>In 30 days</i> - %{thirtyPercent}% \n\n" +
        "<b>Tockenomics</b>: \n\n" +
        "<i>🔒 Bonded</i> - %{bonded} \n\n" +
        "<i>🔐 Unbonding</i> - %{unbonding} \n\n" +
        "<i>🔓 Unbonded</i> - %{unbonded} \n",
    },
  },
  addMoreQuestion: "Do you want add more?",
  back: "<< Go back",
};
