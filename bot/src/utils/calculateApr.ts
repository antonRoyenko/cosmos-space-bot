import Big from "big.js";

export function calculateRealAPR(params: {
  annualProvisions: number;
  communityTax: number;
  bondedTokens: number;
  blocksYearReal: number;
}) {
  if (params.annualProvisions <= 0) {
    return 0;
  }

  const nominalAPR = Big(params.annualProvisions)
    .mul(Big(1).minus(params.communityTax))
    .div(params.bondedTokens);

  const blockProvision = Big(params.annualProvisions).div(
    params.blocksYearReal
  );
  const realProvision = Big(blockProvision).mul(params.blocksYearReal);

  return Big(nominalAPR)
    .mul(Big(realProvision).div(params.annualProvisions))
    .mul(100)
    .toNumber();
}
