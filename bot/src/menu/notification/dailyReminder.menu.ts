import {
  chooseNetworkCallback,
  chooseTimezoneCallback,
  chooseTimeCallback,
  isReminderActiveText,
  toggleReminderActivity,
} from "../callbacks";
import { menuCreator } from "@bot/utils";

const menuList = [
  {
    text: "🛰 network",
    callback: chooseNetworkCallback,
  },
  {
    row: true,
  },
  {
    text: "🕕 Time",
    callback: chooseTimeCallback,
  },
  {
    row: true,
  },
  {
    text: "🌎 Timezone",
    callback: chooseTimezoneCallback,
  },
  {
    row: true,
  },
  {
    text: isReminderActiveText,
    callback: toggleReminderActivity,
  },
  {
    row: true,
  },
  {
    back: "<< Go back",
  },
];

export const dailyReminderMenu = menuCreator("dailyReminder", menuList);
