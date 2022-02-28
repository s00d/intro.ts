import {size} from "../types";
import {_isFixed} from "./_isFixed";
import {_getPropValue} from "./_getPropValue";

export function _getOffset(element: HTMLElement, relativeEl: HTMLElement | null = null): size {
  const body = document.body;
  const docEl = document.documentElement;
  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  relativeEl = relativeEl || body;

  const x = element.getBoundingClientRect();
  const xr = relativeEl.getBoundingClientRect();
  const relativeElPosition = _getPropValue(relativeEl, "position");

  let obj = {
    width: x.width,
    height: x.height,
  };

  if (
    (relativeEl.tagName.toLowerCase() !== "body" &&
      relativeElPosition === "relative") ||
    relativeElPosition === "sticky"
  ) {
    // when the container of our target element is _not_ body and has either "relative" or "sticky" position, we should not
    // consider the scroll position but we need to include the relative x/y of the container element
    return Object.assign(obj, {
      top: x.top - xr.top,
      left: x.left - xr.left,
    });
  } else {
    if (_isFixed(element)) {
      return Object.assign(obj, {
        top: x.top,
        left: x.left,
      });
    } else {
      return Object.assign(obj, {
        top: x.top + scrollTop,
        left: x.left + scrollLeft,
      });
    }
  }
}
