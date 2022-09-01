import {
  addAlarmCallback,
  deleteAlarmCallback,
  listAlarmsCallback,
  listAlarmsText,
  toggleAlarmActivity,
} from "../callbacks";
import { menuCreator } from "@bot/utils";
import { en } from "@bot/constants/en";

const menuList = [
  {
    text: en.notification.alarmMenu.add,
    callback: addAlarmCallback,
  },
  { row: true },
  {
    text: en.notification.alarmMenu.delete,
    callback: deleteAlarmCallback,
  },
  {
    row: true,
  },
  {
    text: en.notification.alarmMenu.list,
    callback: listAlarmsCallback,
  },
  {
    row: true,
  },
  {
    text: listAlarmsText,
    callback: toggleAlarmActivity,
  },
  {
    row: true,
  },
  {
    back: en.back,
  },
];

export const alarmMenu = menuCreator("alarm", menuList);
