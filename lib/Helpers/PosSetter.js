"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosSetter = void 0;
var _getOffset_1 = require("./_getOffset");
var _getWinSize_1 = require("./_getWinSize");
var _removeEntry_1 = require("./_removeEntry");
var PosSetter = /** @class */ (function () {
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
        //reset the old style
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
        //if we have a custom css class for each step
        tooltipLayer.className = 'introts-tooltip';
        tooltipLayer.setAttribute('role', 'dialog');
        var element = document.querySelector("*[data-step='".concat(step, "']"));
        var currentTooltipPosition = (_a = element.dataset.position) !== null && _a !== void 0 ? _a : 'default';
        // Floating is always valid, no point in calculating
        if (currentTooltipPosition !== "floating") {
            currentTooltipPosition = this._determineAutoPosition(element, tooltipLayer, currentTooltipPosition);
        }
        var targetOffset = (0, _getOffset_1._getOffset)(element);
        var tooltipOffset = (0, _getOffset_1._getOffset)(tooltipLayer);
        var windowSize = (0, _getWinSize_1._getWinSize)();
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
    PosSetter.prototype._determineAutoAlignment = function (offsetLeft, tooltipWidth, _a, desiredAlignment) {
        var width = _a.width;
        var halfTooltipWidth = tooltipWidth / 2;
        var winWidth = Math.min(width, window.screen.width);
        var possibleAlignments = [
            "-left-aligned",
            "-middle-aligned",
            "-right-aligned",
        ];
        var calculatedAlignment = "";
        // valid left must be at least a tooltipWidth
        // away from right side
        if (winWidth - offsetLeft < tooltipWidth) {
            (0, _removeEntry_1._removeEntry)(possibleAlignments, "-left-aligned");
        }
        // valid middle must be at least half
        // width away from both sides
        if (offsetLeft < halfTooltipWidth ||
            winWidth - offsetLeft < halfTooltipWidth) {
            (0, _removeEntry_1._removeEntry)(possibleAlignments, "-middle-aligned");
        }
        // valid right must be at least a tooltipWidth
        // width away from left side
        if (offsetLeft < tooltipWidth) {
            (0, _removeEntry_1._removeEntry)(possibleAlignments, "-right-aligned");
        }
        if (possibleAlignments.length) {
            if (possibleAlignments.includes(desiredAlignment)) {
                // the desired alignment is valid
                calculatedAlignment = desiredAlignment;
            }
            else {
                // pick the first valid position, in order
                calculatedAlignment = possibleAlignments[0];
            }
        }
        else {
            // if screen width is too small
            // for ANY alignment, middle is
            // probably the best for visibility
            calculatedAlignment = "-middle-aligned";
        }
        return calculatedAlignment;
    };
    PosSetter.prototype._determineAutoPosition = function (targetElement, tooltipLayer, desiredTooltipPosition) {
        // Take a clone of position precedence. These will be the available
        var possiblePositions = this.positionPrecedence.slice();
        var windowSize = (0, _getWinSize_1._getWinSize)();
        var tooltipHeight = _getOffset_1._getOffset.call(this, tooltipLayer).height + 10;
        var tooltipWidth = _getOffset_1._getOffset.call(this, tooltipLayer).width + 20;
        var targetElementRect = targetElement.getBoundingClientRect();
        // If we check all the possible areas, and there are no valid places for the tooltip, the element
        // must take up most of the screen real estate. Show the tooltip floating in the middle of the screen.
        var calculatedPosition = "floating";
        /*
         * auto determine position
         */
        // Check for space below
        if (targetElementRect.bottom + tooltipHeight > windowSize.height) {
            (0, _removeEntry_1._removeEntry)(possiblePositions, "bottom");
        }
        // Check for space above
        if (targetElementRect.top - tooltipHeight < 0) {
            (0, _removeEntry_1._removeEntry)(possiblePositions, "top");
        }
        // Check for space to the right
        if (targetElementRect.right + tooltipWidth > windowSize.width) {
            (0, _removeEntry_1._removeEntry)(possiblePositions, "right");
        }
        // Check for space to the left
        if (targetElementRect.left - tooltipWidth < 0) {
            (0, _removeEntry_1._removeEntry)(possiblePositions, "left");
        }
        // @var {String}  ex: 'right-aligned'
        var desiredAlignment = (function (pos) {
            var hyphenIndex = pos.indexOf("-");
            if (hyphenIndex !== -1) {
                // has alignment
                return pos.substr(hyphenIndex);
            }
            return "";
        })(desiredTooltipPosition || "");
        // strip alignment from position
        if (desiredTooltipPosition) {
            // ex: "bottom-right-aligned"
            // should return 'bottom'
            desiredTooltipPosition = desiredTooltipPosition.split("-")[0];
        }
        if (possiblePositions.length) {
            if (possiblePositions.includes(desiredTooltipPosition)) {
                // If the requested position is in the list, choose that
                calculatedPosition = desiredTooltipPosition;
            }
            else {
                // Pick the first valid position, in order
                calculatedPosition = possiblePositions[0];
            }
        }
        // only top and bottom positions have optional alignments
        if (["top", "bottom"].includes(calculatedPosition)) {
            calculatedPosition += this._determineAutoAlignment(targetElementRect.left, tooltipWidth, windowSize, desiredAlignment);
        }
        return calculatedPosition;
    };
    PosSetter.prototype._checkLeft = function (targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer) {
        if (targetOffset.left + targetOffset.width - tooltipLayerStyleRight - tooltipOffset.width < 0) {
            // off the left side of the window
            tooltipLayer.style.left = (-targetOffset.left) + 'px';
            return false;
        }
        tooltipLayer.style.right = tooltipLayerStyleRight + 'px';
        return true;
    };
    PosSetter.prototype._checkRight = function (targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer) {
        if (targetOffset.left + tooltipLayerStyleLeft + tooltipOffset.width > windowSize.width) {
            // off the right side of the window
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
        // top-left-aligned is the same as the default top
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
