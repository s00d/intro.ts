import {size} from "../types";

export function _getOffset(element: Element): size {
  const body = document.body;
  const docEl = document.documentElement;
  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
  const x = element.getBoundingClientRect();
  return {
    top: x.top + scrollTop,
    width: x.width,
    height: x.height,
    left: x.left + scrollLeft
  };
}
