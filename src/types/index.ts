export { Context, LocalContextFlavor } from "./context";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
