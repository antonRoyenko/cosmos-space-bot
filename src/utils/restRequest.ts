import fetch from "node-fetch";

export const restRequest = async (url: string) =>
  await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
