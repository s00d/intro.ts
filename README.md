[![npm version](https://badge.fury.io/js/intro-ts.svg)](https://badge.fury.io/js/intro-ts)

# Intro.TS

Step-by-step guide and feature introduction

![npm version](https://s00d.github.io/intro.ts/example/image.png)

## Advantages

Fast, Easy, Typescript, not use virtual dom, Events

Works easier and faster than the original, completely written in ts

# Examples
  
<ul>
    <li><a href="https://s00d.github.io/intro.ts/example/hello-world/index.html" title='Basic usage'>Basic usage</a></li>
    <li><a href="https://s00d.github.io/intro.ts/example/multi-page/index.html" title='Multi Page'>Multi Page</a></li>
    <li><a href="https://s00d.github.io/intro.ts/example/vue/index.html" title='VUE'>VUE</a></li>
</ul>

## Installation

Require this package in your `package.json` or install it by running:
```
npm install intro-ts
```

## Usage
```html
<a href="http://example.com/" data-intro="Hello step one!" data-step="1"></a>
<div class="span6" data-step="2" data-intro="Ok, wasn't that fun?" data-interaction="no" data-position='right' data-scrollTo='tooltip'>
  data
</div>
```

```js
require('intro-ts/lib/bandle/style.scss') // or require('intro-ts/lib/bandle/style.min.css'); or you can add other styles
const { IntroTS } = require('intro-ts');
const intro = new IntroTS();
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

### intro attributes

| Name             | Required  | Default | Description |
|------------------|-----------|---------|-------------|
| data-intro       | yes       |         | The tooltip text of step |
| data-step        | no        |         | Optionally define the number (priority) of step |
| data-position    | no        | right   | Optionally define the position of tooltip, top, left, right, bottom, bottom-left-aligned (same as bottom), bottom-middle-aligned, bottom-right-aligned or auto (to detect the position of element and assign the correct position automatically). Default is bottom |
| data-interaction | no        | no      | Optionally To disable interactions with elements inside the highlighted box, yes or no. |
| data-scroll-to   | no        |         | Optionally define the element to scroll to querySelector. |

### how to use in the browser?

```html
<link href="./lib/bandle/style.min.css" rel="stylesheet">
<script type="text/javascript" src="./lib/bandle/intro.js"></script>
<script>
  function start() {
    var intro = new window.IntroTS();
    intro.start();
  }
</script>
```

## CDN

```html
<link href="https://cdn.jsdelivr.net/npm/intro-ts/lib/bandle/style.min.css" rel="stylesheet">
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/intro-ts/lib/bandle/intro.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/intro-ts/lib/bandle/hints.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/intro-ts/lib/bandle/plugin_vue.js"></script>

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

| Name     | Description              |
|----------|--------------------------|
| init     | Block with guide created |
| start    | launch guide             |
| finish   | close guide              |
| previous | previous step            |
| next     | next step                |
| stop     | stop click               |
| event    | all events               |

```js
intro.addEventListener('start', (data) => {
  console.log('start');
})
```

### Methods

all methods are described in ts

```ts
setOption(option: string, value: string) // set option
setOptions(options: Options) // set options, see Options type
refresh() // program refresh
start(step?:null|number) // show guide, you can pass a step to run
getStep() - get the current step number
addStep(element: HTMLElement|string, intro: string, step: number = 1, position = 'right') // add a step programmatically
addSteps(data: Array<{element: HTMLElement, intro: string, position:string}>) //  add multiple steps programmatically
next(step?: number|null) // programmatically switch step
previous(step?: number|null) // programmatically switch step
stop() // programmatically stop guide
```


## HINTS
```html
<div class="span6" data-hint='test'>data</div>
```
```js
require('intro-ts/lib/bandle/style.scss') // or require('intro-ts/lib/bandle/style.min.css'); or you can add other styles
const { IntroTS } = require('intro-ts');
const { Hints } = require('intro-ts');
var intro = new IntroTS();
var hints = new Hints(); // or require('intro-ts/lib/hints.js'); or see https://s00d.github.io/intro.ts/example/hello-world/index.html
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

```ts
enableHints() - show hints 
hideHints() - hide hints
hideHint(stepId: number) -  hide hint by step number
```

## PLUGINS

### VUE

```html
<link href="./lib/bandle/style.min.css" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="./lib/bandle/plugin_vue.js"></script> 
<!--or let { introVuePlugin } = require('intro-ts')-->
...
<div class="container-narrow" id="index">
  <div class="masthead" v-intro="{intro: 'Get it, use it.', step: 1, interaction: 'no', position: 'right', hint: 'test'}" >
  </div>
</div>

<script>
  window.onload = function () {
    Vue.use(window.introPlugin);
    // or Vue.use(introVuePlugin);
    new Vue({
      el: '#index',
      methods: {
        start() {
          this.$intro.setOptions({
            additionalButtons: {
              name: 'hints', label: 'HINTS', className: 'introts-button', callback: function () {
                this.$intro.stop()
                this.$hints.enableHints()
              }
            },
          });
          this.$intro.addEventListener('start', (data) => {
            this.$hints.hideHints();
          })
          this.$intro.start();
        },
      }
    })
  }

</script>
```

## Bugs

If you have any problems, please create Issues [here](https://github.com/s00d/intro.ts/issues)   
