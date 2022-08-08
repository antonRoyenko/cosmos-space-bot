import fetch, { BodyInit } from "node-fetch";

export const restRequest = async (
  url: string,
  method = "GET",
  body?: BodyInit
) =>
  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body,
  });
