import {
  addAlarmCallback,
  deleteAlarmCallback,
  listAlarmsCallback,
  listAlarmsText,
  toggleAlarmActivity,
} from "../callbacks";
import { menuCreator } from "@bot/utils";

const menuList = [
  {
    text: "➕ Add alert",
    callback: addAlarmCallback,
  },
  { row: true },
  {
    text: "➖ Delete alert",
    callback: deleteAlarmCallback,
  },
  {
    row: true,
  },
  {
    text: "📃 Alerts list",
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
    back: "<< Go back",
  },
];

export const alarmMenu = menuCreator("alarm", menuList);
