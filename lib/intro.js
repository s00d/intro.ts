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
exports.IntroTS = void 0;
var Block_1 = require("./Block");
var EventEmitter_1 = require("./EventEmitter");
var mergeOptions_1 = require("./Helpers/mergeOptions");
var IntroTS = /** @class */ (function (_super) {
    __extends(IntroTS, _super);
    function IntroTS(target) {
        if (target === void 0) { target = null; }
        var _this = _super.call(this) || this;
        _this._steps = [];
        _this._activeStep = null;
        _this.layer = false;
        _this.active = false;
        if (target === null) {
            target = document.body;
        }
        _this._options = (0, mergeOptions_1.mergeOptions)();
        _this._target = target;
        _this.block = new Block_1.Block(_this._options.helperElementPadding, _this._options.showStepNumbers, _this._options.positionPrecedence);
        return _this;
    }
    IntroTS.prototype.setOption = function (option, value) {
        // @ts-ignore
        this._options[option] = value;
        return this;
    };
    IntroTS.prototype.setOptions = function (options) {
        this._options = (0, mergeOptions_1.mergeOptions)(this._options, options);
        return this;
    };
    IntroTS.prototype.refresh = function () {
        this.start();
        return this;
    };
    IntroTS.prototype.start = function (step) {
        var _this = this;
        if (step === void 0) { step = null; }
        this.stop();
        this._steps = [];
        var elements = this._target.querySelectorAll("*[data-intro]");
        elements.forEach(function (el, key) {
            var _a, _b;
            if (!el.dataset.step)
                el.dataset.step = (key - 1).toString();
            var more = (_a = el.getAttribute('data-more')) !== null && _a !== void 0 ? _a : null;
            if (more && (window.innerWidth < parseInt(more)))
                return;
            var less = (_b = el.getAttribute('data-less')) !== null && _b !== void 0 ? _b : null;
            if (less && window.innerWidth > parseInt(less))
                return;
            _this._steps.push(parseInt(el.dataset.step, 10));
        });
        this._steps.sort();
        if (step !== null) {
            var none = true;
            for (var i in this._steps) {
                if (step === this._steps[i]) {
                    step = parseInt(i) - 1;
                    none = false;
                    break;
                }
            }
            if (none)
                this.stop();
        }
        this.createElement(this._target);
        this.next(step);
        if (this._options.keyboardNavigation) {
            window.addEventListener('keydown', function (e) { return _this._onKeyDown(e); });
        }
        window.addEventListener('resize', function () { return _this.stop(); });
        this.dispatch('start');
        return this;
    };
    IntroTS.prototype.getStep = function () {
        if (this._activeStep === null || !this._steps[this._activeStep])
            return null;
        return this._steps[this._activeStep];
    };
    IntroTS.prototype.addStep = function (element, intro, step, position) {
        if (step === void 0) { step = 1; }
        if (position === void 0) { position = 'right'; }
        if (typeof element === "string") {
            var el = this._target.querySelector(element);
            if (!el)
                return this;
            element = el;
        }
        element.dataset.intro = intro;
        element.dataset.step = step.toString();
        element.dataset.position = position;
        return this;
    };
    IntroTS.prototype.addSteps = function (data) {
        for (var i in data) {
            this.addStep(data[i].element, data[i].position, parseInt(i), data[i].position);
        }
        return this;
    };
    IntroTS.prototype.next = function (step, revert) {
        var _this = this;
        var _a, _b;
        if (step === void 0) { step = null; }
        if (revert === void 0) { revert = false; }
        this.active = true;
        if (step === null)
            step = this._activeStep;
        if (step === null) {
            step = revert ? this._steps.length - 1 : 0;
        }
        else {
            var element_1 = this._target.querySelector("*[data-step='".concat(this._steps[step], "']"));
            if (element_1) {
                element_1.classList.remove('intro-show');
                element_1.classList.remove('introts-showElement');
                element_1.classList.remove('introjs-relativePosition');
            }
            revert ? step-- : step++;
            if (!this._steps[step]) {
                this.stop();
                return;
            }
            // if(!element) return this.next(step, revert);
        }
        if (!this._steps[step]) {
            this.stop();
            return;
        }
        var element = this._target.querySelector("*[data-step='".concat(this._steps[step], "']"));
        if (!element) {
            return this.next(revert ? --step : ++step, revert);
        }
        this._activeStep = step;
        element.classList.add('intro-show');
        element.classList.add('introts-showElement');
        element.classList.add('introts-relativePosition');
        var position = (_a = element.getAttribute('data-position')) !== null && _a !== void 0 ? _a : this._options.tooltipPosition;
        element.classList.add("intro-".concat(position));
        this.block.setProgress(this.getProgress(), step);
        this.block.setText((_b = element.getAttribute('data-intro')) !== null && _b !== void 0 ? _b : '');
        this.block.updatePosition(this._steps[this._activeStep]);
        this.block.setWidth(element.getAttribute('data-width'));
        this.block.setButtonsClass(step === 0, step === this._steps.length - 1, this._options.showButtons);
        if (step === this._steps.length - 1 && this._options.doneLabel) {
            this.block.addButton('done', this._options.doneLabel, 'introts-button introts-nextbutton', function () { return _this.dispatch('finish'); }, false);
        }
        else if (this._options.doneLabel) {
            this.block.removeButton('done');
        }
        if (this._options.hideSkip) {
            this.block.setButtonClass('skip', 'introts-hidden');
        }
        if (this._options.hidePrev) {
            this.block.setButtonClass('previous', 'introts-hidden');
        }
        if (this._options.hideNext) {
            this.block.setButtonClass('next', 'introts-hidden');
        }
        if (element.dataset.interaction === 'no') {
            this.block.addHelperClass('introts-disableInteraction');
        }
        else {
            this.block.removeHelperClass('introts-disableInteraction');
        }
        if (this._options.scrollToElement) {
            if (this._options.scrollToIntro) {
                setTimeout(function () {
                    _this._target.querySelector('.introts-tooltip')
                        .scrollIntoView({ block: 'center', behavior: "auto" });
                }, 310);
            }
            else if (element.dataset.scrollTo) {
                var block = this._target.querySelector(element.dataset.scrollTo);
                if (block)
                    block.scrollIntoView({ block: 'center', behavior: "auto" });
            }
            else {
                element.scrollIntoView({ block: 'center', behavior: "auto" });
            }
        }
        setTimeout(function () {
            _this.block.updatePosition(_this._steps[_this._activeStep]);
        }, 300);
        this.dispatch(revert ? 'previous' : 'next', { step: step });
    };
    IntroTS.prototype.previous = function (step) {
        if (step === void 0) { step = null; }
        this.next(step, true);
    };
    IntroTS.prototype.stop = function () {
        var _this = this;
        if (!this.active)
            return;
        this.active = false;
        this._target.querySelectorAll(".intro-show").forEach(function (item) {
            item.classList.remove('intro-show');
        });
        this._target.querySelectorAll(".introts-showElement").forEach(function (item) {
            item.classList.remove('introts-showElement');
        });
        this._target.querySelectorAll(".introts-relativePosition").forEach(function (item) {
            item.classList.remove('introts-relativePosition');
        });
        window.removeEventListener('keydown', function (e) { return _this._onKeyDown(e); });
        window.removeEventListener('resize', function () { return _this.block.updatePosition(_this._activeStep !== null ? _this._steps[_this._activeStep] : undefined); });
        this.block.disable();
        this._activeStep = null;
        this.dispatch('stop');
    };
    IntroTS.prototype._onKeyDown = function (e) {
        var code = (e.code === null) ? e.which : e.code;
        if (code === null) {
            code = (e.charCode === null) ? e.keyCode : e.charCode;
        }
        if ((code === 'Escape' || code === 27) && this._options.exitOnEsc) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
            this.stop();
        }
        else if (code === 'ArrowLeft' || code === 37) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
            this.previous();
        }
        else if (code === 'ArrowRight' || code === 39 || code === 'Enter' || code === 13) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
            this.next();
        }
    };
    IntroTS.prototype.getProgress = function () {
        var _a;
        return (((((_a = this._activeStep) !== null && _a !== void 0 ? _a : 0) + 1) / this._steps.length) * 100);
    };
    IntroTS.prototype.createElement = function (targetElement) {
        var _this = this;
        for (var i in this._options.additionalButtons) {
            var btn = this._options.additionalButtons[i];
            this.block.createButton(btn.name, btn.label, btn.className, btn.callback);
        }
        if (this._options.exitOnOverlayClick) {
            this.block.overlayClick = function () { return _this.stop(); };
        }
        this.block.createButton('skip', this._options.skipLabel, 'introts-button introts-skipbutton', function () { return _this.stop(); });
        this.block.createButton('previous', this._options.prevLabel, 'introts-button introts-prevbutton', function () { return _this.previous(); });
        this.block.createButton('next', this._options.nextLabel, 'introts-button introts-nextbutton', function () { return _this.next(); });
        this.block.create(targetElement, this._options);
        if (this._options.highlight) {
            this.block.addHelperClass('introts-helperLayer');
        }
        if (this._options.showButtons) {
            this.block.setShowButtons();
        }
        if (this._options.showProgress) {
            this.block.setShowProgress();
        }
        if (this._options.showStepNumbers) {
            this.block.setShowHelperNumber();
        }
        this.block.setOverlayOpacity(this._options.overlayOpacity);
        this.layer = true;
        this.dispatch('init');
        return true;
    };
    return IntroTS;
}(EventEmitter_1.EventEmitter));
exports.IntroTS = IntroTS;
exports.default = IntroTS;
try {
    window.IntroTS = IntroTS;
}
catch (err) { }
