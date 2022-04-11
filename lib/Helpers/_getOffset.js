"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getOffset = void 0;
var _isFixed_1 = require("./_isFixed");
var _getPropValue_1 = require("./_getPropValue");
function _getOffset(element, relativeEl) {
    if (relativeEl === void 0) { relativeEl = null; }
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    relativeEl = relativeEl || body;
    var x = element.getBoundingClientRect();
    var xr = relativeEl.getBoundingClientRect();
    var relativeElPosition = (0, _getPropValue_1._getPropValue)(relativeEl, "position");
    var obj = {
        width: x.width,
        height: x.height,
    };
    if ((relativeEl.tagName.toLowerCase() !== "body" &&
        relativeElPosition === "relative") ||
        relativeElPosition === "sticky") {
        // when the container of our target element is _not_ body and has either "relative" or "sticky" position, we should not
        // consider the scroll position but we need to include the relative x/y of the container element
        return Object.assign(obj, {
            top: x.top - xr.top,
            left: x.left - xr.left,
        });
    }
    else {
        if ((0, _isFixed_1._isFixed)(element)) {
            return Object.assign(obj, {
                top: x.top,
                left: x.left,
            });
        }
        else {
            return Object.assign(obj, {
                top: x.top + scrollTop,
                left: x.left + scrollLeft,
            });
        }
    }
}
exports._getOffset = _getOffset;
