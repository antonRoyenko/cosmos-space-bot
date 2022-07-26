import { makePostRequest } from "./request";

const telegramBotKey = process.env.BOT_TOKEN;

export const sendNotification = async (text: string, parse_mode: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  const chatId = searchParams.get("telegram-id");

  const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;
  await makePostRequest(endpoint, {
    text,
    parse_mode,
    chat_id: chatId,
  });
};
