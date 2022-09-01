import {
  chooseNetworkCallback,
  chooseTimezoneCallback,
  chooseTimeCallback,
  isReminderActiveText,
  toggleReminderActivity,
} from "../callbacks";
import { menuCreator } from "@bot/utils";
import { en } from "@bot/constants/en";

const menuList = [
  {
    text: en.notification.reminderMenu.networks,
    callback: chooseNetworkCallback,
  },
  {
    row: true,
  },
  {
    text: en.notification.reminderMenu.time,
    callback: chooseTimeCallback,
  },
  {
    row: true,
  },
  {
    text: en.notification.reminderMenu.timezone,
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
    back: en.back,
  },
];

export const dailyReminderMenu = menuCreator("dailyReminder", menuList);
