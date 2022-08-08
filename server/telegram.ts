import { restRequest } from "@bot/utils/restRequest";
import { config } from "@bot/config";

const telegramBotKey = config.BOT_TOKEN;

export const sendNotification = async (
  text: string,
  parse_mode: string,
  chatId: number
) => {
  const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;
  await restRequest(
    endpoint,
    "POST",
    JSON.stringify({
      text,
      parse_mode,
      chat_id: chatId,
    })
  );
};
