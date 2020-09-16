import {_getOffset, _isFixed, _setHelperLayerPosition, alignHintPosition} from "./helpers";
import {EventEmitter} from "./EventEmitter";

export class Hints extends EventEmitter {
  private hints: { [stepId: number]: HTMLElement };
  private hintsWrapper: HTMLElement;
  private _hintClickCallback: (hintElement: HTMLElement, item: HTMLElement, stepId: number) => void;
  private buttonClass: string;
  private hintButtonLabel: string;
  private target: HTMLElement;
  constructor(target: HTMLElement|null = null) {
    super();
    if(target === null) {
      target = document.body
    }
    this.target = target;
  }

  enableHints() {
    this.hideHints()

    this.hintsWrapper = document.createElement('div');
    this.hintsWrapper.className = 'introts-hints';
    this.target.appendChild(this.hintsWrapper);

    const hints = this.target.querySelectorAll('*[data-hint]');
    let stepId = 0;
    hints.forEach((item: HTMLElement) => {
      this.showHint(item, stepId);
      stepId++
    })
    this.dispatch('enable-hints')
  }

  showHint(element: HTMLElement, stepId: number) {
    this.hints[stepId] = document.createElement('a');
    this.hints[stepId].setAttribute('role', 'button');
    this.hints[stepId].tabIndex = stepId;
    this.hints[stepId].onmouseenter = (e) => {
      this.showHintDialog(this.hints[stepId], element.dataset.hint??'', stepId);
    };
    this.hints[stepId].onmouseleave = (e) => {
      this.removeHintDialog();
    };

    this.hints[stepId].onclick = (e) => {
      var evt = e ? e : window.event;
      if (evt && evt.stopPropagation) {
        evt.stopPropagation();
      }
      if (evt && evt.cancelBubble !== null) {
        evt.cancelBubble = true;
      }
      this.hideHint(stepId)
    };

    this.hints[stepId].className = 'introts-hint';
    if (element.dataset.noHintAnimation) {
      this.hints[stepId].classList.add('introts-hint-no-anim');
    }

    if (_isFixed(element)) {
      this.hints[stepId].classList.add('introts-fixedhint');
    }

    const hintDot = document.createElement('div');
    hintDot.className = 'introts-hint-dot';
    const hintPulse = document.createElement('div');
    hintPulse.className = 'introts-hint-pulse';

    this.hints[stepId].appendChild(hintDot);
    this.hints[stepId].appendChild(hintPulse);
    this.hints[stepId].setAttribute('data-hint', stepId.toString());

    alignHintPosition((element.dataset.hintPosition??'middle-right'), this.hints[stepId], element);

    this.hintsWrapper.appendChild(this.hints[stepId])
  }

  hideHints() {
    for(let stepId in this.hints) {
      this.hideHint(parseInt(stepId))
    }
    if(this.hintsWrapper) {
      this.hintsWrapper.remove();
    }
    this.target.querySelectorAll('.introts-hintReference').forEach((item) => {
      item.remove()
    });
    this.target.querySelectorAll('.introts-hints').forEach((item) => {
      item.remove()
    })
    this.hints = {};

    this.dispatch('hide-hints')
  }

  hideHint(stepId: number) {
    if(this.hints[stepId]) {
      this.hints[stepId].parentElement!.removeChild(this.hints[stepId])
      delete this.hints[stepId];
    }
    this.target.querySelectorAll('.introts-tooltip').forEach((item) => {
      item.remove()
    });
    this.target.querySelectorAll('.intro-show').forEach((item) => {
      item.classList.remove('intro-show')
    })

    if(Object.keys(this.hints).length === 0) {
      this.hideHints();
    }

    this.dispatch('hide-hint', {stepId: stepId})
  }

  protected removeHintDialog() {
    this.target.querySelectorAll('.introts-hintReference').forEach((item) => {
      item.remove()
    })
    this.target.querySelectorAll('.intro-show').forEach((item) => {
      item.classList.remove('intro-show')
    })
    this.dispatch('remove-hint-dialog')
  }


  protected showHintDialog(element: HTMLElement, text: string, stepId: number) {
    element.classList.add('intro-show')

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

    // align reference layer position
    referenceLayer.className = 'introts-tooltipReferenceLayer introts-hintReference';
    referenceLayer.setAttribute('data-step', stepId.toString());
    _setHelperLayerPosition(referenceLayer, 0, 50);

    referenceLayer.appendChild(tooltipLayer);
    this.target.appendChild(referenceLayer);
    this.dispatch('show-hint-dialog')
  }
}

export default Hints

try {
  window.Hints = Hints;
} catch(err) {}
