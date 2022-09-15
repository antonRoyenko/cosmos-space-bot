import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@grammyjs/fluent";
import { ParseModeContext } from "@grammyjs/parse-mode";
import { FileFlavor } from "@grammyjs/files";

import { LocalContext } from "@bot/context";
import { Network } from "@prisma/client";
import { Steps } from "./general";

export interface LocalContextFlavor {
  local: LocalContext;
}

export interface SessionData {
  timezone: string[];
  alarmNetwork?: Network;
  step?: Steps;
}

export type Context = FileFlavor<
  DefaultContext &
    FluentContextFlavor &
    ParseModeContext &
    LocalContextFlavor &
    SessionFlavor<SessionData>
>;
