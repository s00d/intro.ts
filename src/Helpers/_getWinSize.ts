import {size} from "../types";

export function _getWinSize(): size {
  if (window.innerWidth !== undefined) {
    return { width: window.innerWidth, height: window.innerHeight, top: 0, left:0 };
  } else {
    const D = document.documentElement;
    return { width: D.clientWidth, height: D.clientHeight, top: 0, left:0 };
  }
}
