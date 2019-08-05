# react-toastsnack

An unopinionated notification queue for React

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-toastsnack

Using [yarn](https://yarnpkg.com/):

    $ yarn add react-toastsnack


Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```js
// Using ES6 Modules
import { useToastSnack } from "react-toastsnack"
// using CommonJS modules
const useToastSnack = require("react-toastsnack").useToastSnack
```
## Usage (Work in progress...)

At the top-level of your application, import the `ReactToastSnackProvider` module.

```jsx
import React from 'react';
import { ReactToastSnackProvider } from "react-toastsnack";

function AppContext() {
	<ReactToastSnackProvider>
		<App />
	</ReactToastSnackProvider>
}
```

The provider *provides* (ahem) you with a set of parameters:

* [`renderer`](#renderer) *required*
* [`methods`](#methods) *optional*
* [`dismiss`](#dismiss) *optional*
* [`initial`](#initial) *optional*
* [`height`](#height) *optional*
* [`offset`](#offset) *optional*
* [`delay`](#delay) *optional*
* [`max`](#max) *optional*

### renderer

This prop is required, and is the component used to render a single notification. (toast/snack).
`react-toastsnack` has no opinion on how you choose to render it.

`Props` provided to the renderer:

* `toastSnack`
	* `id`
	* `open`
	* `offset`
	* And any other props passed upon creation of the notification.
* `onUpdate`
* `onExited`
* `onClose`

### methods

The `methods` prop allows you to pass an object containing functions, which return custom functions.
Any functions you provide here, can be accessed through the `useToastSnack`/`withToastSnack` api.

### dismiss

### initial

### height

### offset

### delay

### max

## Credits

react-toastsnack is built and maintained by **babangsund**.  
[@blog](https://babangsund.com/).  
[@github](https://github.com/babangsund).  
[@twitter](https://twitter.com/babangsund).  
