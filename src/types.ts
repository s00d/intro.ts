import Hints from "./Hints";
import IntroTS from "./Intro";

export type Options = {
  steps: Array<number>

  /** Next button label in tooltip box */
  nextLabel: string,
  /** Previous button label in tooltip box */
  prevLabel: string,
  /** Skip button label in tooltip box */
  skipLabel: string,
  /** Done button label in tooltip box */
  doneLabel: string|null,

  /** Default tooltip box position */
  tooltipPosition: 'bottom'|'top'|'floating',

  /** Hide previous button? */
  hidePrev: boolean,
  /** Hide next button? */
  hideNext: boolean,
  /** Hide skip button? */
  hideSkip: boolean,

  /** CSS class that is added to the helperLayer */
  highlight: boolean,
  /** Close introduction when pressing Escape button? */
  exitOnEsc: boolean,
  /** Close introduction when clicking on overlay layer? */
  exitOnOverlayClick: boolean,
  /** Show step numbers in introduction? */
  showStepNumbers: boolean,
  /** Let user use keyboard to navigate the tour? */
  keyboardNavigation: boolean,
  /** Show tour control buttons? */
  showButtons: boolean,
  /** Show tour bullets? */
  showBullets: boolean,
  /** Show tour progress? */
  showProgress: boolean,
  /** Scroll to highlighted element? */
  scrollToElement: boolean,

  /** Set the overlay opacity */
  overlayOpacity: number,
  /** Precedence of positions, when auto is enabled */
  positionPrecedence: Array<"bottom"|"top"|"right"|"left">,

  /** Set how much padding to be used around helper element */
  helperElementPadding: number,
  /** additional buttons */
  additionalButtons: Array<{name: string, label: string, className: string, callback: () => void}>
}

export type size = {
  top: number,
  width: number,
  height: number,
  left: number
}

declare global {
  interface Window {
    // add you custom properties and methods
    Hints: typeof Hints
    IntroTS: typeof IntroTS;
  }
}
