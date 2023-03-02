import {Options} from "../types";

export function mergeOptions(oldOptions: Options|null = null, newOptions: Options|null = null): Options {
  if(oldOptions === null) {
    oldOptions = {
      nextLabel: 'Next &rarr;',
      prevLabel: '&larr; Back',
      skipLabel: 'Skip',
      doneLabel: null,
      hidePrev: false,
      hideNext: false,
      hideSkip: false,
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
    }
  }

  if(newOptions === null) {
    return oldOptions;
  }
  for (let i in newOptions) {
    // @ts-ignore
    oldOptions[i] = newOptions[i]
  }
  return oldOptions;
}
