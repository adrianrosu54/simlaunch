import { atom } from "nanostores";

export type View = "side" | "field";
export const $view = atom<View>("field");

export const $isSidebarOpen = atom(false);