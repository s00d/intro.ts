"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._removeEntry = void 0;
function _removeEntry(stringArray, stringToRemove) {
    if (stringArray.includes(stringToRemove)) {
        stringArray.splice(stringArray.indexOf(stringToRemove), 1);
    }
}
exports._removeEntry = _removeEntry;
