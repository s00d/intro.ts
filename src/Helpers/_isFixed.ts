import {_getPropValue} from "./_getPropValue";

export function _isFixed(element: HTMLElement): boolean {
  const p = element.parentNode as HTMLElement;

  if (!p || p.nodeName === "HTML") {
    return false;
  }

  if (_getPropValue(element, "position") === "fixed") {
    return true;
  }

  return _isFixed(p);
}
