import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const getPnlDate = () => {
  const now = dayjs();
  const template = "DD-MM-YYYY";
  const dayAgo = now.subtract(1, "day").format(template);
  const sevenDayAgo = now.subtract(7, "day").format(template);
  const fourteenthDayAgo = now.subtract(14, "day").format(template);
  const thirtyDayAgo = now.subtract(30, "day").format(template);

  return [dayAgo, sevenDayAgo, fourteenthDayAgo, thirtyDayAgo];
};
