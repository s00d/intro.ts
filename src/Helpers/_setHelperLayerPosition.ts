import {_isFixed} from "./_isFixed";
import {_getOffset} from "./_getOffset";

export function _setHelperLayerPosition(helperLayer: HTMLElement, helperElementPadding: number = 0, offset: number = 0) {
  if (helperLayer) {
    const element = <HTMLElement>document.querySelector(`.intro-show`);
    if(!element) return;
    const elementPosition = _getOffset(element)
    let widthHeightPadding = helperElementPadding;

    if (_isFixed(element)) {
      helperLayer.classList.add('introts-fixedTooltip')
    } else {
      helperLayer.classList.remove('introts-fixedTooltip')
    }

    if (element.style.position === 'floating') {
      widthHeightPadding = 0;
    }

    helperLayer.style.cssText = 'width: ' + (elementPosition.width + widthHeightPadding) + 'px; ' +
      'height:' + (elementPosition.height + widthHeightPadding) + 'px; ' +
      'top:' + (elementPosition.top - (widthHeightPadding / 2)) + 'px;' +
      'left: ' + (elementPosition.left - ((widthHeightPadding + offset) / 2) - 1) + 'px;';

  }
}
