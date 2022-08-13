import { InlineKeyboard } from "grammy";

export const agreementKeyboard = new InlineKeyboard()
  .add({
    text: "Yes",
    callback_data: "yes",
  })
  .add({ text: "No", callback_data: "no" });
