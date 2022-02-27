import {_getOffset} from "./_getOffset";

export function alignHintPosition(position: string, hint: HTMLElement, element: HTMLElement) {
  // get/calculate offset of target element
  var offset = _getOffset(element);
  var iconWidth = 20;
  var iconHeight = 20;

  // align the hint element
  switch (position) {
    default:
    case 'top-left':
      hint.style.left = offset.left + 'px';
      hint.style.top = offset.top + 'px';
      break;
    case 'top-right':
      hint.style.left = (offset.left + offset.width - iconWidth) + 'px';
      hint.style.top = offset.top + 'px';
      break;
    case 'bottom-left':
      hint.style.left = offset.left + 'px';
      hint.style.top = (offset.top + offset.height - iconHeight) + 'px';
      break;
    case 'bottom-right':
      hint.style.left = (offset.left + offset.width - iconWidth) + 'px';
      hint.style.top = (offset.top + offset.height - iconHeight) + 'px';
      break;
    case 'middle-left':
      hint.style.left = offset.left + 'px';
      hint.style.top = (offset.top + (offset.height - iconHeight) / 2) + 'px';
      break;
    case 'middle-right':
      hint.style.left = (offset.left + offset.width - iconWidth) + 'px';
      hint.style.top = (offset.top + (offset.height - iconHeight) / 2) + 'px';
      break;
    case 'middle-middle':
      hint.style.left = (offset.left + (offset.width - iconWidth) / 2) + 'px';
      hint.style.top = (offset.top + (offset.height - iconHeight) / 2) + 'px';
      break;
    case 'bottom-middle':
      hint.style.left = (offset.left + (offset.width - iconWidth) / 2) + 'px';
      hint.style.top = (offset.top + offset.height - iconHeight) + 'px';
      break;
    case 'top-middle':
      hint.style.left = (offset.left + (offset.width - iconWidth) / 2) + 'px';
      hint.style.top = offset.top + 'px';
      break;
  }
}
