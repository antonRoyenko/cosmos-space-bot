import { Menu, MenuFlavor } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { Message } from "@grammyjs/types";

type MenuItem =
  | {
      text: string;
      callback: (ctx: Context) => Promise<void | Message.CommonMessage>;
      row?: boolean;
      back?: string;
    }
  | {
      text: (ctx: Context) => Promise<string>;
      callback: (
        ctx: Context & MenuFlavor
      ) => Promise<void | Message.CommonMessage>;
      row?: boolean;
      back?: string;
    }
  | {
      text?: (ctx: Context) => Promise<string>;
      callback?: (ctx: Context) => Promise<void | Message.CommonMessage>;
      row: boolean;
      back?: string;
    }
  | {
      text?: (ctx: Context) => Promise<string>;
      callback?: (ctx: Context) => Promise<void | Message.CommonMessage>;
      row?: boolean;
      back: string;
    };

type MenuList = MenuItem[];

export const menuCreator = (id: string, menuList: MenuList) => {
  const menu = new Menu<Context>(id);

  for (const item of menuList) {
    if (
      (typeof item.text === "string" || typeof item.text === "function") &&
      typeof item.callback === "function"
    ) {
      menu.text(item.text, item.callback);
    }
    if (item.row) {
      menu.row();
    }
    if (item.back) {
      menu.back(item.back);
    }
  }

  return menu;
};
