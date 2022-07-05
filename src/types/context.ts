import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@grammyjs/fluent";
import { ParseModeContext } from "@grammyjs/parse-mode";

import { LocalContext } from "@bot/context";

export interface LocalContextFlavor {
  local: LocalContext;
}

export interface SessionData {
  currencyMenu?: string;
  step: "setup" | "wallet" | "admin" | "home";
}

export type Context = DefaultContext &
  FluentContextFlavor &
  ParseModeContext &
  LocalContextFlavor &
  SessionFlavor<SessionData>;
