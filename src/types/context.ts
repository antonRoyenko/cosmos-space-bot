import { Context as DefaultContext } from "grammy";
import { FluentContextFlavor } from "@grammyjs/fluent";
import { ParseModeContext } from "@grammyjs/parse-mode";

import { LocalContext } from "@bot/context";

export interface LocalContextFlavor {
  local: LocalContext;
}

export type Context = DefaultContext &
  FluentContextFlavor &
  ParseModeContext &
  LocalContextFlavor;
