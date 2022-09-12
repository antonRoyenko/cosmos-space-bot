import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@grammyjs/fluent";
import { ParseModeContext } from "@grammyjs/parse-mode";
import { FileFlavor } from "@grammyjs/files";

import { LocalContext } from "@bot/context";
import { Network } from "@prisma/client";

export interface LocalContextFlavor {
  local: LocalContext;
}

export interface SessionData {
  timezone: string[];
  alarmNetwork?: Network;
  step?:
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
    | "notification"
    | "bulkImportWallet";
}

export type Context = FileFlavor<
  DefaultContext &
    FluentContextFlavor &
    ParseModeContext &
    LocalContextFlavor &
    SessionFlavor<SessionData>
>;
