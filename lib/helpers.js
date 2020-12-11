"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alignHintPosition = exports._setHelperLayerPosition = exports.PosSetter = exports._isFixed = exports._getPropValue = exports._removeEntry = exports._getWinSize = exports._getOffset = exports._forEach = exports.mergeOptions = void 0;
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
        oldOptions[i] = newOptions;
    }
    return oldOptions;
}
exports.mergeOptions = mergeOptions;
function _forEach(arr, forEach, complete) {
    if (arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            forEach(arr[i], i);
        }
    }
    if (complete && typeof (complete) === 'function') {
        complete();
    }
}
exports._forEach = _forEach;
function _getOffset(element) {
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    var x = element.getBoundingClientRect();
    return {
        top: x.top + scrollTop,
        width: x.width,
        height: x.height,
        left: x.left + scrollLeft
    };
}
exports._getOffset = _getOffset;
function _getWinSize() {
    if (window.innerWidth !== undefined) {
        return { width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 };
    }
    else {
        var D = document.documentElement;
        return { width: D.clientWidth, height: D.clientHeight, top: 0, left: 0 };
    }
}
exports._getWinSize = _getWinSize;
function _removeEntry(stringArray, el) {
    if (stringArray.indexOf(el) > -1) {
        stringArray.splice(stringArray.indexOf(el), 1);
    }
}
exports._removeEntry = _removeEntry;
function _getPropValue(element, propName) {
    var propValue = '';
    if ('currentStyle' in element) {
        propValue = element['currentStyle'][propName];
    }
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        propValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(propName);
    }
    if (propValue && propValue.toLowerCase) {
        return propValue.toLowerCase();
    }
    else {
        return propValue;
    }
}
exports._getPropValue = _getPropValue;
function _isFixed(element) {
    var p = element.parentNode;
    if (!p || p.nodeName === 'HTML') {
        return false;
    }
    if (_getPropValue(element, 'position') === 'fixed') {
        return true;
    }
    return _isFixed(p);
}
exports._isFixed = _isFixed;
var PosSetter = (function () {
    function PosSetter(showStepNumbers, positionPrecedence) {
        if (showStepNumbers === void 0) { showStepNumbers = false; }
        if (positionPrecedence === void 0) { positionPrecedence = []; }
        this.showStepNumbers = showStepNumbers;
        this.positionPrecedence = positionPrecedence;
    }
    PosSetter.prototype.place = function (step, tooltipLayer, arrowLayer, helperNumberLayer) {
        var _a;
        if (step === undefined)
            return;
        if (!tooltipLayer)
            return;
        tooltipLayer.style.removeProperty('top');
        tooltipLayer.style.removeProperty('right');
        tooltipLayer.style.removeProperty('bottom');
        tooltipLayer.style.removeProperty('left');
        tooltipLayer.style.removeProperty('marginLeft');
        tooltipLayer.style.removeProperty('marginTop');
        arrowLayer.style.display = 'inherit';
        if (typeof (helperNumberLayer) !== 'undefined' && helperNumberLayer !== null) {
            helperNumberLayer.style.removeProperty('top');
            helperNumberLayer.style.removeProperty('left');
        }
        tooltipLayer.className = 'introts-tooltip';
        tooltipLayer.setAttribute('role', 'dialog');
        var element = document.querySelector("*[data-step='" + step + "']");
        var currentTooltipPosition = (_a = element.dataset.position) !== null && _a !== void 0 ? _a : 'default';
        if (currentTooltipPosition !== "floating") {
            currentTooltipPosition = this._determineAutoPosition(element, tooltipLayer, currentTooltipPosition);
        }
        var targetOffset = _getOffset(element);
        var tooltipOffset = _getOffset(tooltipLayer);
        var windowSize = _getWinSize();
        tooltipLayer.classList.add('introts-' + currentTooltipPosition);
        switch (currentTooltipPosition) {
            case 'top-right-aligned':
                this.topRightAligned(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer);
                break;
            case 'top-middle-aligned':
                this.topMiddleAligned(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer);
                break;
            case 'top':
                this.top(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer);
                break;
            case 'right':
                this.right(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer);
                break;
            case 'left':
                this.left(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer);
                break;
            case 'floating':
                this.floating(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer);
                break;
            case 'bottom-right-aligned':
                this.bottomRightAligned(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer);
                break;
            case 'bottom-middle-aligned':
                this.bottomMiddleAligned(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer);
                break;
            default:
                this.default(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer);
        }
    };
    PosSetter.prototype._determineAutoAlignment = function (offsetLeft, tooltipWidth, windowSize, desiredAlignment) {
        var halfTooltipWidth = tooltipWidth / 2, winWidth = Math.min(windowSize.width, window.screen.width), possibleAlignments = ['-left-aligned', '-middle-aligned', '-right-aligned'], calculatedAlignment = '';
        if (winWidth - offsetLeft < tooltipWidth) {
            _removeEntry(possibleAlignments, '-left-aligned');
        }
        if (offsetLeft < halfTooltipWidth ||
            winWidth - offsetLeft < halfTooltipWidth) {
            _removeEntry(possibleAlignments, '-middle-aligned');
        }
        if (offsetLeft < tooltipWidth) {
            _removeEntry(possibleAlignments, '-right-aligned');
        }
        if (possibleAlignments.length) {
            if (possibleAlignments.indexOf(desiredAlignment) !== -1) {
                calculatedAlignment = desiredAlignment;
            }
            else {
                calculatedAlignment = possibleAlignments[0];
            }
        }
        else {
            calculatedAlignment = '-middle-aligned';
        }
        return calculatedAlignment;
    };
    PosSetter.prototype._determineAutoPosition = function (targetElement, tooltipLayer, desiredTooltipPosition) {
        var possiblePositions = this.positionPrecedence.slice();
        var windowSize = _getWinSize();
        var tooltipHeight = _getOffset(tooltipLayer).height + 10;
        var tooltipWidth = _getOffset(tooltipLayer).width + 20;
        var targetElementRect = targetElement.getBoundingClientRect();
        var calculatedPosition = "floating";
        if (targetElementRect.bottom + tooltipHeight > windowSize.height) {
            _removeEntry(possiblePositions, "bottom");
        }
        if (targetElementRect.top - tooltipHeight < 0) {
            _removeEntry(possiblePositions, "top");
        }
        if (targetElementRect.right + tooltipWidth > windowSize.width) {
            _removeEntry(possiblePositions, "right");
        }
        if (targetElementRect.left - tooltipWidth < 0) {
            _removeEntry(possiblePositions, "left");
        }
        var desiredAlignment = (function (pos) {
            var hyphenIndex = pos.indexOf('-');
            if (hyphenIndex !== -1) {
                return pos.substr(hyphenIndex);
            }
            return '';
        })(desiredTooltipPosition || '');
        if (desiredTooltipPosition) {
            desiredTooltipPosition = desiredTooltipPosition.split('-')[0];
        }
        if (possiblePositions.length) {
            if (desiredTooltipPosition !== "auto" &&
                possiblePositions.indexOf(desiredTooltipPosition) > -1) {
                calculatedPosition = desiredTooltipPosition;
            }
            else {
                calculatedPosition = possiblePositions[0];
            }
        }
        if (['top', 'bottom'].indexOf(calculatedPosition) !== -1) {
            calculatedPosition += this._determineAutoAlignment(targetElementRect.left, tooltipWidth, windowSize, desiredAlignment);
        }
        return calculatedPosition;
    };
    PosSetter.prototype._checkLeft = function (targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer) {
        if (targetOffset.left + targetOffset.width - tooltipLayerStyleRight - tooltipOffset.width < 0) {
            tooltipLayer.style.left = (-targetOffset.left) + 'px';
            return false;
        }
        tooltipLayer.style.right = tooltipLayerStyleRight + 'px';
        return true;
    };
    PosSetter.prototype._checkRight = function (targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer) {
        if (targetOffset.left + tooltipLayerStyleLeft + tooltipOffset.width > windowSize.width) {
            tooltipLayer.style.left = (windowSize.width - tooltipOffset.width - targetOffset.left) + 'px';
            return false;
        }
        tooltipLayer.style.left = tooltipLayerStyleLeft + 'px';
        return true;
    };
    PosSetter.prototype.topRightAligned = function (targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer) {
        arrowLayer.className = 'introts-arrow bottom-right';
        this._checkLeft(targetOffset, 0, tooltipOffset, tooltipLayer);
        tooltipLayer.style.bottom = (targetOffset.height + 20) + 'px';
    };
    PosSetter.prototype.topMiddleAligned = function (targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer) {
        arrowLayer.className = 'introts-arrow bottom-middle';
        var tooltipLayerStyleLeftRight = targetOffset.width / 2 - tooltipOffset.width / 2;
        if (this._checkLeft(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, tooltipLayer)) {
            tooltipLayer.style.removeProperty('right');
            this._checkRight(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, windowSize, tooltipLayer);
        }
        tooltipLayer.style.bottom = (targetOffset.height + 20) + 'px';
    };
    PosSetter.prototype.topLeftAligned = function (targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer) {
    };
    PosSetter.prototype.top = function (targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer) {
        arrowLayer.className = 'introts-arrow bottom';
        this._checkRight(targetOffset, 0, tooltipOffset, windowSize, tooltipLayer);
        tooltipLayer.style.bottom = (targetOffset.height + 20) + 'px';
    };
    PosSetter.prototype.right = function (targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer) {
        tooltipLayer.style.left = (targetOffset.width + 20) + 'px';
        if (targetOffset.top + tooltipOffset.height > windowSize.height) {
            arrowLayer.className = "introts-arrow left-bottom";
            tooltipLayer.style.top = "-" + (tooltipOffset.height - targetOffset.height - 20) + "px";
        }
        else {
            arrowLayer.className = 'introts-arrow left';
        }
    };
    PosSetter.prototype.left = function (targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer) {
        if (this.showStepNumbers) {
            tooltipLayer.style.top = '15px';
        }
        if (targetOffset.top + tooltipOffset.height > windowSize.height) {
            tooltipLayer.style.top = "-" + (tooltipOffset.height - targetOffset.height - 20) + "px";
            arrowLayer.className = 'introts-arrow right-bottom';
        }
        else {
            arrowLayer.className = 'introts-arrow right';
        }
        tooltipLayer.style.right = (targetOffset.width + 20) + 'px';
    };
    PosSetter.prototype.floating = function (targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer) {
        arrowLayer.style.display = 'none';
        tooltipLayer.style.left = '50%';
        tooltipLayer.style.top = '50%';
        tooltipLayer.style.marginLeft = '-' + (tooltipOffset.width / 2) + 'px';
        tooltipLayer.style.marginTop = '-' + (tooltipOffset.height / 2) + 'px';
        if (typeof (helperNumberLayer) !== 'undefined' && helperNumberLayer !== null) {
            helperNumberLayer.style.left = '-' + ((tooltipOffset.width / 2) + 18) + 'px';
            helperNumberLayer.style.top = '-' + ((tooltipOffset.height / 2) + 18) + 'px';
        }
    };
    PosSetter.prototype.bottomRightAligned = function (targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer) {
        arrowLayer.className = 'introts-arrow top-right';
        this._checkLeft(targetOffset, 0, tooltipOffset, tooltipLayer);
        tooltipLayer.style.top = (targetOffset.height + 20) + 'px';
    };
    PosSetter.prototype.bottomMiddleAligned = function (targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer) {
        arrowLayer.className = 'introts-arrow top-middle';
        var tooltipLayerStyleLeftRight = targetOffset.width / 2 - tooltipOffset.width / 2;
        if (this._checkLeft(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, tooltipLayer)) {
            tooltipLayer.style.removeProperty('right');
            this._checkRight(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, windowSize, tooltipLayer);
        }
        tooltipLayer.style.top = (targetOffset.height + 20) + 'px';
    };
    PosSetter.prototype.default = function (targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer) {
        arrowLayer.className = 'introts-arrow top';
        this._checkRight(targetOffset, 0, tooltipOffset, windowSize, tooltipLayer);
        tooltipLayer.style.top = (targetOffset.height + 20) + 'px';
    };
    return PosSetter;
}());
exports.PosSetter = PosSetter;
function _setHelperLayerPosition(helperLayer, helperElementPadding, offset) {
    if (helperElementPadding === void 0) { helperElementPadding = 0; }
    if (offset === void 0) { offset = 0; }
    if (helperLayer) {
        var element = document.querySelector(".intro-show");
        if (!element)
            return;
        var elementPosition = _getOffset(element);
        var widthHeightPadding = helperElementPadding;
        if (_isFixed(element)) {
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
            'top:' + (elementPosition.top - widthHeightPadding / 2) + 'px;' +
            'left: ' + (elementPosition.left - widthHeightPadding + offset / 2) + 'px;';
    }
}
exports._setHelperLayerPosition = _setHelperLayerPosition;
function alignHintPosition(position, hint, element) {
    var offset = _getOffset(element);
    var iconWidth = 20;
    var iconHeight = 20;
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
exports.alignHintPosition = alignHintPosition;
//# sourceMappingURL=helpers.js.map