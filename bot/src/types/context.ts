import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@grammyjs/fluent";
import { ParseModeContext } from "@grammyjs/parse-mode";

import { LocalContext } from "@bot/context";
import { Wallet } from "@prisma/client";

export interface LocalContextFlavor {
  local: LocalContext;
}

export interface SessionData {
  currentNetwork?: string;
  currentWallets: Wallet[];
  timezone: string[];
  step:
    | "setup"
    | "wallet"
    | "walletMenu"
    | "admin"
    | "home"
    | "help"
    | "stats"
    | "governance"
    | "resources"
    | "assets"
    | "timezone";
}

export type Context = DefaultContext &
  FluentContextFlavor &
  ParseModeContext &
  LocalContextFlavor &
  SessionFlavor<SessionData>;
