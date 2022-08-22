import {
  addAlarmCallback,
  deleteAlarmCallback,
  listAlarmsCallback,
  listAlarmsText,
  toggleAlarmActivity,
} from "../callbacks";
import { menuCreator } from "@bot/utils/menuCreator";

const menuList = [
  {
    text: "Add alarm",
    callback: addAlarmCallback,
  },
  { row: true },
  {
    text: "Delete alarms",
    callback: deleteAlarmCallback,
  },
  {
    row: true,
  },
  {
    text: "List alarms",
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
    back: "Go back",
  },
];

export const alarmMenu = menuCreator("alarm", menuList);
