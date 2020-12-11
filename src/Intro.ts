import { Options } from "./types";
import { mergeOptions } from "./helpers";
import { Block } from "./Block";
import {EventEmitter} from "./EventEmitter";

class IntroTS extends EventEmitter {
  private _options: Options;
  private _steps: Array<number> = [];
  private _activeStep: number|null = null;
  private _target: HTMLElement;
  private block: Block;
  private layer = false;
  private active = false;

  constructor(target: HTMLElement|null = null) {
    super();
    if(target === null) {
      target = document.body
    }

    this._options = mergeOptions()
    this._target = target as HTMLElement;
    this.block = new Block(
      this._options.helperElementPadding,
      this._options.showStepNumbers,
      this._options.positionPrecedence,
    )
  }

  setOption(option: string, value: any) {
    // @ts-ignore
    this._options[option] = value;
    return this
  }

  setOptions(options: Options) {
    this._options = mergeOptions(this._options, options)
    return this
  }

  refresh() {
    this.start()
    return this;
  }

  start(step:number|null = null) {
    this._steps = [];
    const elements = this._target.querySelectorAll("*[data-intro]");
    elements.forEach((el: HTMLElement, key: number) => {
      if(!el.dataset.step) el.dataset.step = (key-1).toString();
      this._steps.push(parseInt(<string>el.dataset.step, 10));
    })
    this._steps.sort();

    if(step !== null) {
      for(var i in this._steps) {
        if(step === this._steps[i]) {
          step = parseInt(i) - 1;
        } else {
          return this.stop();
        }
      }
    }

    this.createElement(this._target)

    this.next(step);
    if (this._options.keyboardNavigation) {
      window.addEventListener('keydown', (e) => this._onKeyDown(e))
    }
    window.addEventListener('resize', () => this.stop())

    this.dispatch('start')
    return this
  }

  getStep() {
    if (this._activeStep === null || !this._steps[this._activeStep]) return null;
    return this._steps[this._activeStep];
  }

  addStep(element: HTMLElement|string, intro: string, step: number = 1, position = 'right') {
    if(typeof element === "string") {
      let el = <HTMLElement>this._target.querySelector(element)
      if(!el) return this;
      element = el
    }
    element.dataset.intro = intro
    element.dataset.step = step.toString();
    element.dataset.position = position;
    return this;
  }

  addSteps(data: Array<{element: HTMLElement, intro: string, position:string}>) {
    for (let i in data) {
      this.addStep(data[i].element, data[i].position, parseInt(i), data[i].position)
    }
    return this;
  }

  next(step: number|null = null, revert = false): void {
    this.active = true;
    if(step === null) step = this._activeStep
    if(step === null) {
      step = revert ? this._steps.length-1 : 0
    } else {
      const element = <HTMLElement>this._target.querySelector(`*[data-step='${this._steps[step]}']`);
      if (element) {
       element.classList.remove('intro-show')
       element.classList.remove('introts-showElement')
       element.classList.remove('introjs-relativePosition')
      }

      revert ? step-- : step++;
      if(!this._steps[step]) {
        this.stop()
        return;
      }
      // if(!element) return this.next(step, revert);
    }
    if(!this._steps[step]) {
      this.stop()
      return;
    }
    const element = <HTMLElement>this._target.querySelector(`*[data-step='${this._steps[step]}']`);
    if(!element) {
      return this.next(revert ? --step : ++step, revert);
    }
    this._activeStep = step
    element.classList.add('intro-show')
    element.classList.add('introts-showElement')
    element.classList.add('introts-relativePosition')
    let position = element.getAttribute('data-position') ?? this._options.tooltipPosition
    element.classList.add(`intro-${position}`)
    this.block.setProgress(this.getProgress(), step)
    this.block.setText(element.getAttribute('data-intro') ?? '')
    this.block.updatePosition(this._steps[this._activeStep])
    this.block.setWidth(element.getAttribute('data-width'))

    this.block.setButtonsClass(step===0?'first':step===this._steps.length-1?'last':'', this._options.showButtons)
    if(step===this._steps.length-1 && this._options.doneLabel) {
      this.block.addButton('done', this._options.doneLabel, 'introts-button introts-nextbutton', ()=>this.dispatch('finish'), false);
    } else if(this._options.doneLabel) {
      this.block.removeButton('done')

    }

    if(element.dataset.interaction === 'no') {
      this.block.addHelperClass('introts-disableInteraction')
    } else {
      this.block.removeHelperClass('introts-disableInteraction')
    }

    if(this._options.scrollToElement) {
      if(element.dataset.scrollTo) {
        const block = <HTMLElement>this._target.querySelector(element.dataset.scrollTo)
        if(block) block.scrollIntoView({block: "center", behavior: "smooth"});
      } else {
        element.scrollIntoView({block: "center", behavior: "smooth"});
      }
    }

    this.dispatch(revert?'previous':'next', {step: step})
  }

  previous(step: number|null = null): void {
    this.next(step, true)
  }

  stop(): void {
    if(!this.active) return;
    this.active = false;

    this._target.querySelectorAll(`.intro-show`).forEach((item: HTMLElement) => {
      item.classList.remove('intro-show')
    });
    window.removeEventListener('keydown', (e) => this._onKeyDown(e))
    window.removeEventListener('resize', () => this.block.updatePosition(this._activeStep!==null?this._steps[this._activeStep]:undefined))

    this.block.disable()
    this._activeStep = null;

    this.dispatch('stop')
  }

  protected _onKeyDown(e: KeyboardEvent) {
    let code = (e.code === null) ? e.which : e.code;
    if (code === null) {
      code = (e.charCode === null) ? e.keyCode : e.charCode;
    }
    if ((code === 'Escape' || code === 27) && this._options.exitOnEsc) {
      if(e.preventDefault) {e.preventDefault()} else {e.returnValue = false}
      this.stop()
    } else if (code === 'ArrowLeft' || code === 37) {
      if(e.preventDefault) {e.preventDefault()} else {e.returnValue = false}
      this.previous()
    } else if (code === 'ArrowRight' || code === 39 || code === 'Enter' || code === 13) {
      if(e.preventDefault) {e.preventDefault()} else {e.returnValue = false}
      this.next()
    }
  }

  protected getProgress() {
    return ((((this._activeStep ?? 0)+1) / this._steps.length) * 100);
  }

  protected createElement(targetElement: HTMLElement): boolean {
    for (let i in this._options.additionalButtons) {
      let btn = this._options.additionalButtons[i]
      this.block.createButton(btn.name, btn.label, btn.className, btn.callback);
    }
    if (this._options.exitOnOverlayClick) {
      this.block.overlayClick = () => this.stop()
    }
    this.block.createButton('skip', this._options.skipLabel, 'introts-button introts-skipbutton', ()=>this.stop());
    this.block.createButton('previous', this._options.prevLabel, 'introts-button introts-prevbutton', ()=>this.previous());
    this.block.createButton('next', this._options.nextLabel, 'introts-button introts-nextbutton', ()=>this.next())

    this.block.create(targetElement, this._options)
    if (this._options.highlight) {
      this.block.addHelperClass('introts-helperLayer')
    }
    if (this._options.showButtons) {
      this.block.setShowButtons()
    }
    if (this._options.showProgress) {
      this.block.setShowProgress()
    }
    if (this._options.showStepNumbers) {
      this.block.setShowHelperNumber()
    }

    this.block.setOverlayOpacity(this._options.overlayOpacity);
    this.layer = true;

    this.dispatch('init')

    return true;
  }
}

export default IntroTS
export { IntroTS }

try {
  window.IntroTS = IntroTS;
} catch(err) {}
