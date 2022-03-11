import { atom, useRecoilState } from "recoil";

export const isDarkAtom = atom({
  key: "isDarkAtom",
  default: false,
});
