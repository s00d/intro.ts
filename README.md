[![npm version](https://badge.fury.io/js/intro-ts.svg)](https://badge.fury.io/js/intro-ts)

# Intro.TS

Step-by-step guide and feature introduction

![npm version](https://s00d.github.io/intro.ts/example/image.png)

## Advantages

Fast, Easy, Typescript, not use virtual dom, Events

Works easier and faster than the original, completely written in ts

# Examples
  
[[show](https://s00d.github.io/intro.ts/example/index.html)]

## Installation

Require this package in your `package.json` or install it by running:
```
npm install intro-ts
```

## Usage

```js
    require('intro-ts/src/style.scss') // or require('intro-ts/lib/style.min.css'); or you can add other styles
    const intro = require('intro-ts');
    intro.setOptions({
      additionalButtons: {
        name: 'test', label: 'test', className: 'introts-button', callback: function () {
          intro.stop()
        }
      },
    });
    intro.addEventListener('start', (data) => {
      console.log('start');
    })
    intro.addEventListener('next', (data) => {
      console.log(data);
    })
    intro.start();

```

### how to use in the browser?

```html
<link href="./lib/style.min.css" rel="stylesheet">
<script type="text/javascript" src="./lib/intro.js"></script>
<script>
  function start() {
    var intro = new window.IntroTS();
    intro.start();
  }
</script>
```

## Options

```js
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

  /** Hide previous button in the first step? Otherwise, it will be disabled button. */
  hidePrev: boolean,
  /** Hide next button in the last step? Otherwise, it will be disabled button. */
  hideNext: boolean,

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
  /** additional buttons, see examples */
  additionalButtons: Array<{name: string, label: string, className: string, callback: () => void}>
```

## Events

init - Block with guide created

start - launch guide 

finish - close guide

previous - previous step

next - next step

stop - stop click

event - all events

### Methods

all methods are described in ts

setOption(option: string, value: string) - set option

setOptions(options: Options) - set options, see Options type

refresh() - program refresh

start(step?:null|number) - show guide, you can pass a step to run

getStep() - get the current step number

addStep(element: HTMLElement|string, intro: string, step: number = 1, position = 'right') - add a step programmatically

addSteps(data: Array<{element: HTMLElement, intro: string, position:string}>) -  add multiple steps programmatically

next(step?: number|null) - programmatically switch step

previous(step?: number|null) - programmatically switch step

stop() - programmatically stop guide

## HINTS

```js
    require('intro-ts/src/style.scss') // or require('intro-ts/lib/style.min.css'); or you can add other styles
    const intro = require('intro-ts');
    const intro = require('intro-ts/src/Hints.ts'); // or require('intro-ts/lib/hints.js'); or see https://s00d.github.io/intro.ts/example/hello-world/index.html
    intro.setOptions({
      additionalButtons: {
        name: 'hints', label: 'HINTS', className: 'introts-button', callback: function () {
          intro.stop()
          hints.enableHints()
        }
      },
    });
    intro.addEventListener('start', (data) => {
      hints.hideHints();
    })
    intro.addEventListener('next', (data) => {
      console.log(data);
    })
    intro.start();
```

enableHints() - show hints 

hideHints() - hide hints

hideHint(stepId: number) -  hide hint by step number

## Bugs

If you have any problems, please create Issues [here](https://github.com/s00d/intro-ts/issues)   
