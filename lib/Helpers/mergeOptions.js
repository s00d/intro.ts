"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeOptions = void 0;
function mergeOptions(oldOptions, newOptions) {
    if (oldOptions === void 0) { oldOptions = null; }
    if (newOptions === void 0) { newOptions = null; }
    if (oldOptions === null) {
        oldOptions = {
            nextLabel: 'Next &rarr;',
            prevLabel: '&larr; Back',
            skipLabel: 'Skip',
            doneLabel: null,
            hidePrev: false,
            hideNext: false,
            hideSkip: false,
            tooltipPosition: 'bottom',
            highlight: true,
            exitOnEsc: true,
            exitOnOverlayClick: true,
            showStepNumbers: true,
            keyboardNavigation: true,
            showButtons: true,
            showBullets: true,
            showProgress: true,
            scrollToElement: true,
            overlayOpacity: 0.5,
            positionPrecedence: ["bottom", "top", "right", "left"],
            helperElementPadding: 10,
            steps: [],
            additionalButtons: [],
        };
    }
    if (newOptions === null) {
        return oldOptions;
    }
    for (var i in newOptions) {
        // @ts-ignore
        oldOptions[i] = newOptions;
    }
    return oldOptions;
}
exports.mergeOptions = mergeOptions;
