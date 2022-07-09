export const desmosChain = {
  network: "desmos",
  icon: "../assets/desmos_icon.svg",
  logo: "../assets/desmos_logo.svg",
  prefix: {
    consensus: "desmosvalcons",
    validator: "desmosvaloper",
    account: "desmos",
  },
  genesis: {
    time: "2021-08-31T15:00:00",
    height: 1,
  },
  primaryTokenUnit: "udsm",
  votingPowerTokenUnit: "udsm",
  tokenUnits: {
    udsm: {
      display: "dsm",
      exponent: 6,
    },
  },
  contract:
    "ibc/EA4C0A9F72E2CEDF10D0E7A9A6A22954DB3444910DB5BE980DF59B05A46DAD1C",
};
