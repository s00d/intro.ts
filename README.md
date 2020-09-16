[![npm version](https://badge.fury.io/js/intro-ts.svg)](https://badge.fury.io/js/intro-ts)

# Intro.TS

Step-by-step guide and feature introduction

![npm version](https://raw.githubusercontent.com/s00d/intro-ts/master/example/image.png)

## Advantages

Fast, Easy, Typescript, no virtual dom, Events

Works easier and faster than the original, completely written in ts

# Examples
  
[[hello-wirld](https://raw.githubusercontent.com/s00d/intro-ts/example/hello-world/index.html)]

[[multi-page](https://raw.githubusercontent.com/s00d/intro-ts/example/multi-page/index.html)]

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

## Bugs

If you have any problems, please create Issues [here](https://github.com/s00d/intro-ts/issues)   
