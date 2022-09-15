import { KEYBOARD } from "@bot/constants/keyboard";
import { InlineKeyboard } from "grammy";

export const agreementKeyboard = new InlineKeyboard()
  .add({
    text: KEYBOARD.TEXT_YES,
    callback_data: KEYBOARD.CALLBACK_YES,
  })
  .add({ text: KEYBOARD.TEXT_NO, callback_data: KEYBOARD.CALLBACK_NO });
