"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
var helpers_1 = require("./helpers");
var Block = (function () {
    function Block(helperElementPadding, showStepNumbers, positionPrecedence) {
        if (helperElementPadding === void 0) { helperElementPadding = 0; }
        this.buttonsList = {};
        this.helperElementPadding = helperElementPadding;
        this._posSetter = new helpers_1.PosSetter(showStepNumbers, positionPrecedence);
    }
    Block.prototype.create = function (targetElement, options) {
        this.targetElement = targetElement;
        this.generateLayer();
        this.generateOverlay();
        this.generateHelper();
        this.generateReference();
        this.generateHelperNumber();
        this.generateTooltip();
        this.generateTooltipText();
        this.generateArrow();
        this.generateButtons();
        this.generateProgress();
    };
    Block.prototype.createButton = function (name, label, className, callback, last) {
        if (last === void 0) { last = true; }
        var button = document.createElement('a');
        button.onclick = callback;
        button.className = 'introts-button ' + className;
        button.setAttribute('role', 'button');
        button.tabIndex = Object.keys(this.buttonsList).length;
        button.innerHTML = label;
        if (last)
            this.buttonsList[name] = button;
        if (!last)
            this.buttonsList = Object.assign({ name: button }, this.buttonsList);
    };
    Block.prototype.addButton = function (name, label, className, callback, last) {
        if (last === void 0) { last = true; }
        var button = document.createElement('a');
        button.onclick = callback;
        button.className = 'introts-button ' + className;
        button.setAttribute('role', 'button');
        button.tabIndex = Object.keys(this.buttonsList).length;
        button.innerHTML = label;
        this.buttonsList[name] = button;
        if (!last)
            this.buttons.append(this.buttonsList[name]);
        if (last)
            this.buttons.prepend(this.buttonsList[name]);
    };
    Block.prototype.removeButton = function (name) {
        if (!this.buttonsList[name])
            return;
        this.buttonsList[name].remove();
        delete this.buttonsList[name];
    };
    Block.prototype.setButtonsClass = function (step, hide) {
        this.removeButtonClass('previous', 'introts-hidden');
        this.removeButtonClass('next', 'introts-hidden');
        this.removeButtonClass('previous', 'introts-disabled');
        this.removeButtonClass('next', 'introts-disabled');
        if (step === 'first') {
            this.setButtonClass('previous', hide ? 'introts-hidden' : 'introts-disabled');
        }
        if (step === 'last') {
            this.setButtonClass('next', hide ? 'introts-hidden' : 'introts-disabled');
        }
    };
    Block.prototype.setButtonClass = function (button, className) {
        if (!this.buttonsList[button])
            return;
        this.buttonsList[button].classList.add(className);
    };
    Block.prototype.setButtonText = function (button, text) {
        if (!this.buttonsList[button])
            return;
        this.buttonsList[button].innerHTML = text;
    };
    Block.prototype.removeButtonClass = function (button, className) {
        this.buttonsList[button].classList.remove(className);
    };
    Block.prototype.disable = function () {
        this.layer.remove();
    };
    Block.prototype.setProgress = function (progress, step) {
        if (progress === void 0) { progress = 0; }
        if (step === void 0) { step = 0; }
        this.progressBar.setAttribute('aria-valuenow', progress.toString());
        this.progressBar.style.cssText = 'width:' + progress + '%;';
        this.helperNumberLayer.innerHTML = (step + 1).toString();
        this.helperNumberLayer.dataset.activeStep = step.toString();
    };
    Block.prototype.addHelperClass = function (highlightClass) {
        if (this.helper.classList.contains(highlightClass))
            return;
        this.helper.classList.add(highlightClass);
    };
    Block.prototype.removeHelperClass = function (highlightClass) {
        this.helper.classList.remove(highlightClass);
    };
    Block.prototype.setShowButtons = function () {
        this.buttons.style.removeProperty('display');
    };
    Block.prototype.setShowProgress = function () {
        this.progress.style.removeProperty('display');
    };
    Block.prototype.setWidth = function (width) {
        if (width) {
            this.tooltip.style.width = width + 'px';
            this.tooltip.style.maxWidth = width + 'px';
        }
        else {
            this.tooltip.style.removeProperty("width");
            this.tooltip.style.removeProperty("maxWidth");
        }
    };
    Block.prototype.setText = function (text) {
        this.tooltipText.innerHTML = text;
    };
    Block.prototype.setShowHelperNumber = function () {
        this.helperNumberLayer.style.removeProperty('display');
    };
    Block.prototype.overlayClick = function () { };
    Block.prototype.setOverlayOpacity = function (overlayOpacity) {
        var _this = this;
        var styleText = this.overlay.style.cssText;
        setTimeout(function () {
            styleText += 'opacity: ' + overlayOpacity.toString() + ';';
            _this.overlay.style.cssText = styleText;
        }, 10);
    };
    Block.prototype.generateButtons = function () {
        this.buttons = document.createElement('div');
        this.buttons.className = 'introts-tooltipbuttons';
        this.buttons.style.display = 'none';
        for (var name_1 in this.buttonsList) {
            this.buttons.append(this.buttonsList[name_1]);
            if (name_1 === 'next') {
                this.buttonsList[name_1].focus();
            }
        }
        this.tooltip.append(this.buttons);
    };
    Block.prototype.updatePosition = function (step) {
        helpers_1._setHelperLayerPosition(this.reference, this.helperElementPadding);
        helpers_1._setHelperLayerPosition(this.helper, this.helperElementPadding);
        if (step !== undefined) {
            this._posSetter.place(step, this.tooltip, this.arrow, this.helperNumberLayer);
        }
    };
    Block.prototype.generateHelperNumber = function () {
        this.helperNumberLayer = document.createElement('span');
        this.helperNumberLayer.style.display = 'none';
        this.helperNumberLayer.className = 'introts-helperNumberLayer';
        this.helperNumberLayer.innerHTML = '0';
        this.reference.append(this.helperNumberLayer);
    };
    Block.prototype.generateOverlay = function () {
        this.overlay = document.createElement('div');
        var styles = 'opacity: 0;';
        this.overlay.className = 'introts-overlay';
        if (!this.targetElement.tagName || this.targetElement.tagName.toLowerCase() === 'body') {
            styles += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
            this.overlay.style.cssText = styles;
        }
        else {
            var elementPosition = helpers_1._getOffset(this.targetElement);
            if (elementPosition) {
                styles += 'width: ' + elementPosition.width + 'px; height:' + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
                this.overlay.style.cssText = styles;
            }
        }
        this.overlay.onclick = this.overlayClick;
        this.layer.append(this.overlay);
    };
    Block.prototype.generateProgress = function () {
        this.progress = document.createElement('div');
        this.progress.className = 'introts-progress';
        this.progress.style.display = 'none';
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'introts-progressbar';
        this.progressBar.setAttribute('role', 'progress');
        this.progressBar.setAttribute('aria-valuemin', '0');
        this.progressBar.setAttribute('aria-valuemax', '100');
        this.progressBar.setAttribute('aria-valuenow', '0');
        this.progressBar.style.cssText = 'width: 0%;';
        this.progress.append(this.progressBar);
        this.tooltip.append(this.progress);
    };
    Block.prototype.generateLayer = function () {
        this.layer = document.createElement('div');
        this.layer.className = 'introts';
        this.targetElement.append(this.layer);
    };
    Block.prototype.generateTooltipText = function () {
        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'introts-tooltiptext';
        this.tooltipText.innerHTML = '';
        this.tooltip.append(this.tooltipText);
    };
    Block.prototype.generateTooltip = function () {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'introts-tooltip';
        this.reference.append(this.tooltip);
    };
    Block.prototype.generateArrow = function () {
        this.arrow = document.createElement('div');
        this.arrow.className = 'introts-arrow';
        this.tooltip.append(this.arrow);
    };
    Block.prototype.generateReference = function () {
        this.reference = document.createElement('div');
        this.reference.className = 'introts-tooltipReferenceLayer';
        this.layer.append(this.reference);
    };
    Block.prototype.generateHelper = function () {
        this.helper = document.createElement('div');
        this.layer.append(this.helper);
    };
    return Block;
}());
exports.Block = Block;
//# sourceMappingURL=Block.js.map