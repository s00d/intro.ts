import {_getOffset, _isFixed, _setHelperLayerPosition, PosSetter} from "./helpers";
import {Options} from "./types";

export class Block {
  private layer: HTMLDivElement;
  private reference: HTMLDivElement;
  private arrow: HTMLDivElement;
  private tooltip: HTMLDivElement;
  private tooltipText: HTMLDivElement;
  private progress: HTMLDivElement;
  private progressBar: HTMLDivElement;
  private buttons: HTMLDivElement;
  private helperElementPadding: number;
  private buttonsList: {
    [name: string]: HTMLAnchorElement;
  } = {}
  private overlay: HTMLDivElement;
  private helperNumberLayer: HTMLSpanElement;
  private targetElement: HTMLElement;
  private helper: HTMLDivElement;
  private _posSetter: PosSetter;

  constructor(helperElementPadding = 0, showStepNumbers:boolean, positionPrecedence:Array<string>) {
    this.helperElementPadding = helperElementPadding
    this._posSetter = new PosSetter(showStepNumbers, positionPrecedence)

  }

  create(targetElement: HTMLElement, options: Options) {
    this.targetElement = targetElement
    this.generateLayer();
    this.generateOverlay()
    this.generateHelper();
    this.generateReference();
    this.generateHelperNumber();
    this.generateTooltip();
    this.generateTooltipText();
    this.generateArrow();
    this.generateButtons();
    this.generateProgress();
  }

  createButton(name: string, label: string, className: string, callback: () => void, last = true) {
    let button = document.createElement('a');
    button.onclick = callback;
    button.className = 'introts-button ' + className;
    button.setAttribute('role', 'button');
    button.tabIndex = Object.keys(this.buttonsList).length;
    button.innerHTML = label;
    if(last) this.buttonsList[name] = button;
    if(!last) this.buttonsList = Object.assign({name: button}, this.buttonsList);
  }

  addButton(name: string, label: string, className: string, callback: () => void, last = true) {
    let button = document.createElement('a');
    button.onclick = callback;
    button.className = 'introts-button ' + className;
    button.setAttribute('role', 'button');
    button.tabIndex = Object.keys(this.buttonsList).length;
    button.innerHTML = label;
    this.buttonsList[name] = button;
    if(!last) this.buttons.append(this.buttonsList[name]);
    if(last) this.buttons.prepend(this.buttonsList[name]);
  }

  removeButton(name: string) {
    if(!this.buttonsList[name]) return;
    this.buttonsList[name].remove()
    delete this.buttonsList[name];
  }

  setButtonsClass(step: 'first'|'last'|string, hide: boolean) {
    this.removeButtonClass('previous', 'introts-hidden')
    this.removeButtonClass('next', 'introts-hidden')
    this.removeButtonClass('previous', 'introts-disabled')
    this.removeButtonClass('next', 'introts-disabled')
    if(step === 'first') {
      this.setButtonClass('previous', hide?'introts-hidden':'introts-disabled')
    }
    if(step === 'last') {
      this.setButtonClass('next', hide?'introts-hidden':'introts-disabled')
    }
  }
  setButtonClass(button: string, className: string) {
    if(!this.buttonsList[button]) return;
    this.buttonsList[button].classList.add(className)
  }

  setButtonText(button: string, text: string) {
    if(!this.buttonsList[button]) return;
    this.buttonsList[button].innerHTML = text
  }

  removeButtonClass(button: string, className: string) {
    this.buttonsList[button].classList.remove(className)
  }

  disable() {
    this.layer.remove()
  }

  setProgress(progress = 0, step = 0) {
    this.progressBar.setAttribute('aria-valuenow', progress.toString());
    this.progressBar.style.cssText = 'width:' + progress + '%;';
    this.helperNumberLayer.innerHTML = (step+1).toString();

    this.helperNumberLayer.dataset.activeStep = step.toString();
  }

  addHelperClass(highlightClass: string) {
    if(this.helper.classList.contains(highlightClass)) return;
    this.helper.classList.add(highlightClass);
  }

  removeHelperClass(highlightClass: string) {
    this.helper.classList.remove(highlightClass);
  }

  setShowButtons() {
    this.buttons.style.removeProperty('display');
  }
  setShowProgress() {
    this.progress.style.removeProperty('display');
  }

  setWidth(width: string|null) {
    if(width) {
      this.tooltip.style.width = width+'px'
    } else {
      this.tooltip.style.removeProperty("width");
    }
  }

  setText(text: string) {
    this.tooltipText.innerHTML = text;
  }

  setShowHelperNumber() {
    this.helperNumberLayer.style.removeProperty('display')
  }

  overlayClick() {}

  setOverlayOpacity(overlayOpacity: number) {
    let styleText = this.overlay.style.cssText;
    setTimeout(() => {
      styleText += 'opacity: ' + overlayOpacity.toString() + ';';
      this.overlay.style.cssText = styleText;
    }, 10);
  }

  generateButtons() {
    this.buttons = document.createElement('div');
    this.buttons.className = 'introts-tooltipbuttons';
    this.buttons.style.display = 'none';

    for(let name in this.buttonsList) {
      this.buttons.append(this.buttonsList[name]);
      if(name === 'next') {
        this.buttonsList[name].focus();
      }
    }

    this.tooltip.append(this.buttons);
  }

  updatePosition(step: number|undefined) {
    _setHelperLayerPosition(this.reference, this.helperElementPadding)
    _setHelperLayerPosition(this.helper, this.helperElementPadding)

    if(step !== undefined) {
      this._posSetter.place(step, this.tooltip, this.arrow, this.helperNumberLayer);
    }
  }

  protected generateHelperNumber() {
    this.helperNumberLayer = document.createElement('span');
    this.helperNumberLayer.style.display = 'none';
    this.helperNumberLayer.className = 'introts-helperNumberLayer';
    this.helperNumberLayer.innerHTML = '0';
    this.reference.append(this.helperNumberLayer);
  }

  protected generateOverlay() {
    this.overlay = document.createElement('div')
    let styles = 'opacity: 0;';
    this.overlay.className = 'introts-overlay';
    if (!this.targetElement.tagName || this.targetElement.tagName.toLowerCase() === 'body') {
      styles += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
      this.overlay.style.cssText = styles;
    } else {
      const elementPosition = _getOffset(this.targetElement);
      if (elementPosition) {
        styles += 'width: ' + elementPosition.width + 'px; height:' + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
        this.overlay.style.cssText = styles;
      }
    }
    this.overlay.onclick = this.overlayClick;
    this.layer.append(this.overlay);
  }

  protected generateProgress() {
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
  }

  protected generateLayer() {
    this.layer = document.createElement('div');
    this.layer.className = 'introts';
    this.targetElement.append(this.layer)
  }

  protected generateTooltipText() {
    this.tooltipText = document.createElement('div');
    this.tooltipText.className = 'introts-tooltiptext';
    this.tooltipText.innerHTML = '';
    this.tooltip.append(this.tooltipText);

  }

  protected generateTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'introts-tooltip';
    this.reference.append(this.tooltip);
  }

  protected generateArrow() {
    this.arrow = document.createElement('div');
    this.arrow.className = 'introts-arrow';
    this.tooltip.append(this.arrow);
  }

  protected generateReference() {
    this.reference = document.createElement('div');
    this.reference.className = 'introts-tooltipReferenceLayer';
    this.layer.append(this.reference);
  }

  protected generateHelper() {
    this.helper = document.createElement('div');
    this.layer.append(this.helper);
  }
}
