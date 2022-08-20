import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@grammyjs/fluent";
import { ParseModeContext } from "@grammyjs/parse-mode";

import { LocalContext } from "@bot/context";
import { Network, Wallet } from "@prisma/client";

export interface LocalContextFlavor {
  local: LocalContext;
}

export interface SessionData {
  currentNetwork?: string;
  timezone: string[];
  alarmNetwork?: Network;
  step:
    | "wallet"
    | "walletMenu"
    | "admin"
    | "home"
    | "help"
    | "stats"
    | "governance"
    | "resources"
    | "assets"
    | "timezone"
    | "notification";
}

export type Context = DefaultContext &
  FluentContextFlavor &
  ParseModeContext &
  LocalContextFlavor &
  SessionFlavor<SessionData>;
