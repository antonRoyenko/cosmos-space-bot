import { fetchLatestHeight, fetchBlock } from "@bot/api";

export async function getBlocksPerYearReal(api: string) {
  const latestHeight = await fetchLatestHeight(api);
  const block1 = latestHeight.height.header;
  const blockRange = Number(block1.height) > 10000 ? 10000 : 1;

  const nextBlock = await fetchBlock(api, Number(block1.height) - blockRange);
  const block2 = nextBlock.height.header;

  const yearMilisec = 31536000000;
  const blockMilisec =
    (new Date(block1.time).getTime() - new Date(block2.time).getTime()) /
    blockRange;
  return { blocksPerYear: Math.ceil(yearMilisec / blockMilisec) };
}
