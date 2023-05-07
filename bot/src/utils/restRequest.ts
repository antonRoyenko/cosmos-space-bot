import fetch, { BodyInit } from "node-fetch";

export const restRequest = async (
  url: string,
  method = "GET",
  body?: BodyInit
) =>
  await fetch(url, {
    method,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body,
  });
