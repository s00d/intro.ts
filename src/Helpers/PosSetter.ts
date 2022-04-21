import {size} from "../types";
import {_getOffset} from "./_getOffset";
import {_getWinSize} from "./_getWinSize";
import {_removeEntry} from "./_removeEntry";

export class PosSetter {
  private readonly showStepNumbers: boolean;
  private readonly positionPrecedence: Array<string>;
  private timer: NodeJS.Timeout|null = null;
  private interval: NodeJS.Timer|null = null;
  constructor(showStepNumbers: boolean = false, positionPrecedence: Array<string> = []) {
    this.showStepNumbers = showStepNumbers
    this.positionPrecedence = positionPrecedence
  }

  place(step:number|undefined, tooltipLayer: HTMLElement, arrowLayer: HTMLElement, helperNumberLayer: HTMLElement) {
    if (step === undefined) return;
    if (!tooltipLayer) return;

    //reset the old style
    tooltipLayer.style.removeProperty('top');
    tooltipLayer.style.removeProperty('right');
    tooltipLayer.style.removeProperty('bottom');
    tooltipLayer.style.removeProperty('left');
    tooltipLayer.style.removeProperty('marginLeft');
    tooltipLayer.style.removeProperty('marginTop');

    arrowLayer.style.display = 'inherit';

    if (typeof(helperNumberLayer) !== 'undefined' && helperNumberLayer !== null) {
      helperNumberLayer.style.removeProperty('top');
      helperNumberLayer.style.removeProperty('left');
    }

    //if we have a custom css class for each step
    tooltipLayer.className = 'introts-tooltip';

    tooltipLayer.classList.add('introts-shake')

    if(!this.timer) {
      console.log('hidder')
      tooltipLayer.style.opacity = '0.0';
      this.timer = setTimeout(() => {
        if(!this.interval) {
          this.interval = setInterval(() => {
            tooltipLayer.style.opacity = (parseFloat(tooltipLayer.style.opacity) + 0.1).toString();
            if(parseFloat(tooltipLayer.style.opacity) >= 1.0 && this.interval) {
              clearInterval(this.interval)
              this.interval = null;
            }
          }, 10);
        }

        setTimeout(() => {
          tooltipLayer.classList.remove('introts-shake')
        }, 100)


        if(this.timer) {
          this.timer = null;
        }
      }, 500);
    }

    tooltipLayer.setAttribute('role', 'dialog');


    const element = <HTMLElement>document.querySelector(`*[data-step='${step}']`);
    let currentTooltipPosition = element.dataset.position ?? 'default';
    // Floating is always valid, no point in calculating
    if (currentTooltipPosition !== "floating") {
      currentTooltipPosition = this._determineAutoPosition(element, tooltipLayer, currentTooltipPosition);
    }

    let targetOffset  = _getOffset(element);
    let tooltipOffset = _getOffset(tooltipLayer);
    let windowSize    = _getWinSize();

    tooltipLayer.classList.add('introts-' + currentTooltipPosition)

    switch (currentTooltipPosition) {
      case 'top-right-aligned':
        this.topRightAligned(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer)
        break;
      case 'top-middle-aligned':
        this.topMiddleAligned(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer)
        break;
      case 'top':
        this.top(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer)
        break;
      case 'right':
        this.right(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer)
        break;
      case 'left':
        this.left(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer)
        break;
      case 'floating':
        this.floating(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer)
        break;
      case 'bottom-right-aligned':
        this.bottomRightAligned(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer)
        break;
      case 'bottom-middle-aligned':
        this.bottomMiddleAligned(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer)
        break;
      default:
        this.default(targetOffset, arrowLayer, tooltipOffset, tooltipLayer, windowSize, helperNumberLayer)
    }
  }

  private _determineAutoAlignment (offsetLeft: number, tooltipWidth: number, { width }: { width: number }, desiredAlignment: string) {
    const halfTooltipWidth = tooltipWidth / 2;
    const winWidth = Math.min(width, window.screen.width);
    const possibleAlignments = [
      "-left-aligned",
      "-middle-aligned",
      "-right-aligned",
    ];
    let calculatedAlignment = "";

    // valid left must be at least a tooltipWidth
    // away from right side
    if (winWidth - offsetLeft < tooltipWidth) {
      _removeEntry(possibleAlignments, "-left-aligned");
    }

    // valid middle must be at least half
    // width away from both sides
    if (
      offsetLeft < halfTooltipWidth ||
      winWidth - offsetLeft < halfTooltipWidth
    ) {
      _removeEntry(possibleAlignments, "-middle-aligned");
    }

    // valid right must be at least a tooltipWidth
    // width away from left side
    if (offsetLeft < tooltipWidth) {
      _removeEntry(possibleAlignments, "-right-aligned");
    }

    if (possibleAlignments.length) {
      if (possibleAlignments.includes(desiredAlignment)) {
        // the desired alignment is valid
        calculatedAlignment = desiredAlignment;
      } else {
        // pick the first valid position, in order
        calculatedAlignment = possibleAlignments[0];
      }
    } else {
      // if screen width is too small
      // for ANY alignment, middle is
      // probably the best for visibility
      calculatedAlignment = "-middle-aligned";
    }

    return calculatedAlignment;
  }

  private _determineAutoPosition(targetElement: HTMLElement, tooltipLayer: HTMLElement, desiredTooltipPosition: string) {
// Take a clone of position precedence. These will be the available
    const possiblePositions = this.positionPrecedence!.slice();

    const windowSize = _getWinSize();
    const tooltipHeight = _getOffset.call(this, tooltipLayer).height + 10;
    const tooltipWidth = _getOffset.call(this, tooltipLayer).width + 20;
    const targetElementRect = targetElement.getBoundingClientRect();

    // If we check all the possible areas, and there are no valid places for the tooltip, the element
    // must take up most of the screen real estate. Show the tooltip floating in the middle of the screen.
    let calculatedPosition = "floating";

    /*
     * auto determine position
     */

    // Check for space below
    if (targetElementRect.bottom + tooltipHeight > windowSize.height) {
      _removeEntry(possiblePositions, "bottom");
    }

    // Check for space above
    if (targetElementRect.top - tooltipHeight < 0) {
      _removeEntry(possiblePositions, "top");
    }

    // Check for space to the right
    if (targetElementRect.right + tooltipWidth > windowSize.width) {
      _removeEntry(possiblePositions, "right");
    }

    // Check for space to the left
    if (targetElementRect.left - tooltipWidth < 0) {
      _removeEntry(possiblePositions, "left");
    }

    // @var {String}  ex: 'right-aligned'
    const desiredAlignment = ((pos) => {
      const hyphenIndex = pos.indexOf("-");
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
      } else {
        // Pick the first valid position, in order
        calculatedPosition = possiblePositions[0];
      }
    }

    // only top and bottom positions have optional alignments
    if (["top", "bottom"].includes(calculatedPosition)) {
      calculatedPosition += this._determineAutoAlignment(
        targetElementRect.left,
        tooltipWidth,
        windowSize,
        desiredAlignment
      );
    }

    return calculatedPosition;
  }

  private _checkLeft(targetOffset: size, tooltipLayerStyleRight: number, tooltipOffset: size, tooltipLayer: HTMLElement) {
    if (targetOffset.left + targetOffset.width - tooltipLayerStyleRight - tooltipOffset.width < 0) {
      // off the left side of the window
      tooltipLayer.style.left = (-targetOffset.left) + 'px';
      return false;
    }
    tooltipLayer.style.right = tooltipLayerStyleRight + 'px';
    return true;
  }
  private _checkRight(targetOffset: size, tooltipLayerStyleLeft:number, tooltipOffset: size, windowSize: size, tooltipLayer: HTMLElement) {
    if (targetOffset.left + tooltipLayerStyleLeft + tooltipOffset.width > windowSize.width) {
      // off the right side of the window
      tooltipLayer.style.left = (windowSize.width - tooltipOffset.width - targetOffset.left) + 'px';
      return false;
    }
    tooltipLayer.style.left = tooltipLayerStyleLeft + 'px';
    return true;
  }

  private topRightAligned(targetOffset: size, arrowLayer: HTMLElement, tooltipOffset: size, tooltipLayer: HTMLElement, windowSize: size, helperNumberLayer: HTMLElement|null) {
    arrowLayer.className      = 'introts-arrow bottom-right';

    this._checkLeft(targetOffset, 0, tooltipOffset, tooltipLayer);
    tooltipLayer.style.bottom = (targetOffset.height +  20) + 'px';
  }

  private topMiddleAligned(targetOffset: size, arrowLayer: HTMLElement, tooltipOffset: size, tooltipLayer: HTMLElement, windowSize: size, helperNumberLayer: HTMLElement|null) {
    arrowLayer.className      = 'introts-arrow bottom-middle';

    var tooltipLayerStyleLeftRight = targetOffset.width / 2 - tooltipOffset.width / 2;

    if (this._checkLeft(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, tooltipLayer)) {
      tooltipLayer.style.removeProperty('right');
      this._checkRight(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, windowSize, tooltipLayer);
    }
    tooltipLayer.style.bottom = (targetOffset.height + 20) + 'px';
  }

  private topLeftAligned(targetOffset: size, arrowLayer: HTMLElement, tooltipOffset: size, tooltipLayer: HTMLElement, windowSize: size, helperNumberLayer: HTMLElement|null) {
    // top-left-aligned is the same as the default top
  }

  private top(targetOffset: size, arrowLayer: HTMLElement, tooltipOffset: size, tooltipLayer: HTMLElement, windowSize: size, helperNumberLayer: HTMLElement|null) {
    arrowLayer.className = 'introts-arrow bottom';
    this._checkRight(targetOffset, 0, tooltipOffset, windowSize, tooltipLayer);
    tooltipLayer.style.bottom = (targetOffset.height +  20) + 'px';
  }

  private right(targetOffset: size, arrowLayer: HTMLElement, tooltipOffset: size, tooltipLayer: HTMLElement, windowSize: size, helperNumberLayer: HTMLElement|null) {
    tooltipLayer.style.left = (targetOffset.width + 20) + 'px';
    if (targetOffset.top + tooltipOffset.height > windowSize.height) {
      arrowLayer.className = "introts-arrow left-bottom";
      tooltipLayer.style.top = "-" + (tooltipOffset.height - targetOffset.height - 20) + "px";
    } else {
      arrowLayer.className = 'introts-arrow left';
    }
  }

  private left(targetOffset: size, arrowLayer: HTMLElement, tooltipOffset: size, tooltipLayer: HTMLElement, windowSize: size, helperNumberLayer: HTMLElement|null) {
    if (this.showStepNumbers) {
      tooltipLayer.style.top = '15px';
    }

    if (targetOffset.top + tooltipOffset.height > windowSize.height) {
      tooltipLayer.style.top = "-" + (tooltipOffset.height - targetOffset.height - 20) + "px";
      arrowLayer.className = 'introts-arrow right-bottom';
    } else {
      arrowLayer.className = 'introts-arrow right';
    }
    tooltipLayer.style.right = (targetOffset.width + 20) + 'px';
  }

  private floating(targetOffset: size, arrowLayer: HTMLElement, tooltipOffset: size, tooltipLayer: HTMLElement, windowSize: size, helperNumberLayer: HTMLElement|null) {
    arrowLayer.style.display = 'none';
    tooltipLayer.style.left   = '50%';
    tooltipLayer.style.top    = '50%';
    tooltipLayer.style.marginLeft = '-' + (tooltipOffset.width / 2)  + 'px';
    tooltipLayer.style.marginTop  = '-' + (tooltipOffset.height / 2) + 'px';

    if (typeof(helperNumberLayer) !== 'undefined' && helperNumberLayer !== null) {
      helperNumberLayer.style.left = '-' + ((tooltipOffset.width / 2) + 18) + 'px';
      helperNumberLayer.style.top  = '-' + ((tooltipOffset.height / 2) + 18) + 'px';
    }
  }

  private bottomRightAligned(targetOffset: size, arrowLayer: HTMLElement, tooltipOffset: size, tooltipLayer: HTMLElement, windowSize: size, helperNumberLayer: HTMLElement|null) {
    arrowLayer.className      = 'introts-arrow top-right';
    this._checkLeft(targetOffset, 0, tooltipOffset, tooltipLayer);
    tooltipLayer.style.top    = (targetOffset.height +  20) + 'px';
  }


  private bottomMiddleAligned(targetOffset: size, arrowLayer: HTMLElement, tooltipOffset: size, tooltipLayer: HTMLElement, windowSize: size, helperNumberLayer: HTMLElement|null) {
    arrowLayer.className      = 'introts-arrow top-middle';

    const tooltipLayerStyleLeftRight = targetOffset.width / 2 - tooltipOffset.width / 2;
    if (this._checkLeft(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, tooltipLayer)) {
      tooltipLayer.style.removeProperty('right');
      this._checkRight(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, windowSize, tooltipLayer);
    }
    tooltipLayer.style.top = (targetOffset.height + 20) + 'px';
  }

  private default(targetOffset: size, arrowLayer: HTMLElement, tooltipOffset: size, tooltipLayer: HTMLElement, windowSize: size, helperNumberLayer: HTMLElement|null) {
    arrowLayer.className = 'introts-arrow top';
    this._checkRight(targetOffset, 0, tooltipOffset, windowSize, tooltipLayer);
    tooltipLayer.style.top    = (targetOffset.height +  20) + 'px';
  }
}
