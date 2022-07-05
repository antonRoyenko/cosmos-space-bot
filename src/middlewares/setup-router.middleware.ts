import { Router } from "@grammyjs/router";
import { Context } from "@bot/types";

export const middleware = new Router<Context>((ctx) => ctx.session.step);
