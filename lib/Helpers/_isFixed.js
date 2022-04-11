"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._isFixed = void 0;
var _getPropValue_1 = require("./_getPropValue");
function _isFixed(element) {
    var p = element.parentNode;
    if (!p || p.nodeName === "HTML") {
        return false;
    }
    if ((0, _getPropValue_1._getPropValue)(element, "position") === "fixed") {
        return true;
    }
    return _isFixed(p);
}
exports._isFixed = _isFixed;
