"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getPropValue = void 0;
function _getPropValue(element, propName) {
    var propValue = "";
    // @ts-ignore
    if (element.currentStyle) {
        //IE
        // @ts-ignore
        propValue = element.currentStyle[propName];
    }
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        //Others
        propValue = document.defaultView
            .getComputedStyle(element, null)
            .getPropertyValue(propName);
    }
    //Prevent exception in IE
    if (propValue && propValue.toLowerCase) {
        return propValue.toLowerCase();
    }
    else {
        return propValue;
    }
}
exports._getPropValue = _getPropValue;
