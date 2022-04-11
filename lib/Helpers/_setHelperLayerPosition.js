"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._setHelperLayerPosition = void 0;
var _isFixed_1 = require("./_isFixed");
var _getOffset_1 = require("./_getOffset");
function _setHelperLayerPosition(targetElement, helperLayer, helperElementPadding, offset) {
    if (helperElementPadding === void 0) { helperElementPadding = 0; }
    if (offset === void 0) { offset = 0; }
    if (helperLayer) {
        var element = document.querySelector(".intro-show");
        if (!element)
            return;
        var elementPosition = (0, _getOffset_1._getOffset)(element, targetElement);
        var widthHeightPadding = helperElementPadding;
        if ((0, _isFixed_1._isFixed)(element)) {
            helperLayer.classList.add('introts-fixedTooltip');
        }
        else {
            helperLayer.classList.remove('introts-fixedTooltip');
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
exports._setHelperLayerPosition = _setHelperLayerPosition;
