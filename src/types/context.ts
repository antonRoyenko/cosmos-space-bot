import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@grammyjs/fluent";
import { ParseModeContext } from "@grammyjs/parse-mode";

import { LocalContext } from "@bot/context";

export interface LocalContextFlavor {
  local: LocalContext;
}

export interface SessionData {
  currentMenu?: string;
  currentWallets: Array<string>;
  step: "setup" | "wallet" | "admin" | "home";
}

export type Context = DefaultContext &
  FluentContextFlavor &
  ParseModeContext &
  LocalContextFlavor &
  SessionFlavor<SessionData>;
