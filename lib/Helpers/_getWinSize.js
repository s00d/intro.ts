"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getWinSize = void 0;
function _getWinSize() {
    if (window.innerWidth !== undefined) {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            top: 0,
            left: 0,
        };
    }
    else {
        var D = document.documentElement;
        return { width: D.clientWidth, height: D.clientHeight, top: 0, left: 0 };
    }
}
exports._getWinSize = _getWinSize;
