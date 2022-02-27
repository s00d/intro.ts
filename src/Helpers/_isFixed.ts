import {_getPropValue} from "./_getPropValue";

export function _isFixed(element: HTMLElement): boolean {
  const p = <HTMLElement>element.parentNode;

  if (!p || p.nodeName === 'HTML') {
    return false;
  }

  if (_getPropValue(element, 'position') === 'fixed') {
    return true;
  }

  return _isFixed(p);
}
