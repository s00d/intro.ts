"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hints = void 0;
var EventEmitter_1 = require("./EventEmitter");
var _isFixed_1 = require("./Helpers/_isFixed");
var alignHintPosition_1 = require("./Helpers/alignHintPosition");
var _setHelperLayerPosition_1 = require("./Helpers/_setHelperLayerPosition");
var Hints = (function (_super) {
    __extends(Hints, _super);
    function Hints(target) {
        if (target === void 0) { target = null; }
        var _this = _super.call(this) || this;
        if (target === null) {
            target = document.body;
        }
        _this.target = target;
        return _this;
    }
    Hints.prototype.enableHints = function () {
        var _this = this;
        this.hideHints();
        this.hintsWrapper = document.createElement('div');
        this.hintsWrapper.className = 'introts-hints';
        this.target.appendChild(this.hintsWrapper);
        var hints = this.target.querySelectorAll('*[data-hint]');
        var stepId = 0;
        hints.forEach(function (item) {
            _this.showHint(item, stepId);
            stepId++;
        });
        this.dispatch('enable-hints');
    };
    Hints.prototype.hideHints = function () {
        for (var stepId in this.hints) {
            this.hideHint(parseInt(stepId));
        }
        if (this.hintsWrapper) {
            this.hintsWrapper.remove();
        }
        this.target.querySelectorAll('.introts-hintReference').forEach(function (item) {
            item.remove();
        });
        this.target.querySelectorAll('.introts-hints').forEach(function (item) {
            item.remove();
        });
        this.hints = {};
        this.dispatch('hide-hints');
    };
    Hints.prototype.hideHint = function (stepId) {
        if (this.hints[stepId]) {
            this.hints[stepId].parentElement.removeChild(this.hints[stepId]);
            delete this.hints[stepId];
        }
        this.target.querySelectorAll('.introts-tooltip').forEach(function (item) {
            item.remove();
        });
        this.target.querySelectorAll('.intro-show').forEach(function (item) {
            item.classList.remove('intro-show');
        });
        if (Object.keys(this.hints).length === 0) {
            this.hideHints();
        }
        this.dispatch('hide-hint', { stepId: stepId });
    };
    Hints.prototype.showHint = function (element, stepId) {
        var _this = this;
        var _a;
        this.hints[stepId] = document.createElement('a');
        this.hints[stepId].setAttribute('role', 'button');
        this.hints[stepId].tabIndex = stepId;
        this.hints[stepId].onmouseenter = function (e) {
            var _a;
            _this.showHintDialog(_this.hints[stepId], (_a = element.dataset.hint) !== null && _a !== void 0 ? _a : '', stepId);
        };
        this.hints[stepId].onmouseleave = function (e) {
            _this.removeHintDialog();
        };
        this.hints[stepId].onclick = function (e) {
            var evt = e ? e : window.event;
            if (evt && evt.stopPropagation) {
                evt.stopPropagation();
            }
            if (evt && evt.cancelBubble !== null) {
                evt.cancelBubble = true;
            }
            _this.hideHint(stepId);
        };
        this.hints[stepId].className = 'introts-hint';
        if (element.dataset.noHintAnimation) {
            this.hints[stepId].classList.add('introts-hint-no-anim');
        }
        if ((0, _isFixed_1._isFixed)(element)) {
            this.hints[stepId].classList.add('introts-fixedhint');
        }
        var hintDot = document.createElement('div');
        hintDot.className = 'introts-hint-dot';
        var hintPulse = document.createElement('div');
        hintPulse.className = 'introts-hint-pulse';
        this.hints[stepId].appendChild(hintDot);
        this.hints[stepId].appendChild(hintPulse);
        this.hints[stepId].setAttribute('data-hint', stepId.toString());
        (0, alignHintPosition_1.alignHintPosition)(((_a = element.dataset.hintPosition) !== null && _a !== void 0 ? _a : 'middle-right'), this.hints[stepId], element);
        this.hintsWrapper.appendChild(this.hints[stepId]);
    };
    Hints.prototype.removeHintDialog = function () {
        this.target.querySelectorAll('.introts-hintReference').forEach(function (item) {
            item.remove();
        });
        this.target.querySelectorAll('.intro-show').forEach(function (item) {
            item.classList.remove('intro-show');
        });
        this.dispatch('remove-hint-dialog');
    };
    Hints.prototype.showHintDialog = function (element, text, stepId) {
        element.classList.add('intro-show');
        var tooltipLayer = document.createElement('div');
        var tooltipTextLayer = document.createElement('div');
        var arrowLayer = document.createElement('div');
        var referenceLayer = document.createElement('div');
        tooltipLayer.className = 'introts-tooltip';
        tooltipTextLayer.className = 'introts-tooltiptext';
        var tooltipWrapper = document.createElement('p');
        tooltipWrapper.innerHTML = text;
        tooltipTextLayer.appendChild(tooltipWrapper);
        arrowLayer.className = 'introts-arrow';
        tooltipLayer.appendChild(arrowLayer);
        tooltipLayer.appendChild(tooltipTextLayer);
        referenceLayer.className = 'introts-tooltipReferenceLayer introts-hintReference';
        referenceLayer.setAttribute('data-step', stepId.toString());
        (0, _setHelperLayerPosition_1._setHelperLayerPosition)(referenceLayer);
        referenceLayer.appendChild(tooltipLayer);
        this.target.appendChild(referenceLayer);
        this.dispatch('show-hint-dialog');
    };
    return Hints;
}(EventEmitter_1.EventEmitter));
exports.Hints = Hints;
exports.default = Hints;
try {
    window.Hints = Hints;
}
catch (err) { }
//# sourceMappingURL=Hints.js.map