import {
  chooseNetworkCallback,
  chooseTimezoneCallback,
  chooseTimeCallback,
  isReminderActiveText,
  toggleReminderActivity,
} from "../callbacks";
import { menuCreator } from "@bot/utils/menuCreator";

const menuList = [
  {
    text: "Choose network",
    callback: chooseNetworkCallback,
  },
  {
    row: true,
  },
  {
    text: "Choose Time",
    callback: chooseTimezoneCallback,
  },
  {
    row: true,
  },
  {
    text: "Choose Timezone",
    callback: chooseTimeCallback,
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
    back: "Go back",
  },
];

export const reminderDailyMenu = menuCreator("dailyReminder", menuList);
