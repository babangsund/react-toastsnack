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
## Usage

At the top-level of your application, import the `ReactToastSnackProvider` module.

```jsx
// AppContext.js
import React from 'react';
import { ReactToastSnackProvider } from "react-toastsnack";

function AppContext() {
  return (
    <ReactToastSnackProvider>
      <App />
    </ReactToastSnackProvider>
  );
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

This prop is required, and is the component used to render a single notification.  
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

For example, let's say we're using the [material-ui component library](https://material-ui.com/).  
The `renderer` may look something like this:

```jsx
// AppContext.js
import React from 'react';
import { ReactToastSnackProvider } from "react-toastsnack";

import Snackbar from "@material-ui/core/Snackbar";

function AppContext() {
  return (
    <ReactToastSnackProvider renderer={ToastSnack}>
      <App />
    </ReactToastSnackProvider>
  )
}

const ToastSnack = React.memo(props => {
  const { onUpdate, onExited, onClose, toastSnack } = props;
  const {
    id,
    open,
    offset
    // Any other props are controlled by you.
    style,
    message,
    contentProps,
    autoHideDuration,
    ...other
  } = toastSnack;

  // If the snack height isn't the same as the default height
  // as the one we provided to ReactToastSnackProvider,
  // we may want to update it
  const ref = useRef(null);
  useLayoutEffect(() => {
    const height = ref.current?.clientHeight;
    if (height && snackProps.height !== height) {
      onUpdate({ id, height });
    }
  }, [id, onUpdate, snackProps.height]);

  const handleClose = React.useCallback((event,reason) => {
    if (reason === "clickaway") return;
    onClose(id);
  }, [id, onClose]);

  const handleExited = React.useCallback((event) => {
    onExited(id);
  }, [id, onExited]);


  return (
    <RootRef rootRef={ref}>
      <Snackbar
        style={style}
        onClose={handleClose}
        onExited={handleExited}
        autoHideDuration={autoHideDuration}
        {...other}
      >
        <SnackbarContent
          message={message}
          {...contentProps}
        />
      </Snackbar>
    </RootRef>
  )
});
```

### methods

The `methods` prop allows you to pass an object containing functions, which generate custom methods.  
Any functions you provide here, can be accessed through the `useToastSnack`/`withToastSnack` api.

For example, I want to implement a notification centered around a promise.

```jsx
// AppContext.js
import React from 'react';
import { ReactToastSnackProvider } from "react-toastsnack";

function AppContext() {
  const methods = React.useMemo(() => {
    // onCreate and onUpdate is passed, so we can create a custom flow.
    promise: (onCreate, onUpdate) => {
      return ({promise, ...other}) => {

        // Create a new notification and save the id to a variable
        // We've set the duration to null, in order to persist
        // the notification until the promise is resolved or rejected
        const id = onCreate({
          ...other,
          duration: null,
          color: "colorLoading",
          message: "Please wait for something",
        });

        promise
          // If the promise is resolved, 
          // change the color to `colorSuccess`, update the message
          // and change the duration to 1000
          .then(() => {
            onUpdate({
              ...other,
              id,
              duration: 1000,
              color: "colorSuccess",
              message: "You bought 3 puppies!",
            });
          })
          // If the promise is rejected, inform the user
          // by changing the color to colorError and updating the message
          // The duration is set to 5000
          .catch(() => {
            onUpdate({
              id,
              duration: 5000,
              color: "colorError",
              message: "An error occurred!",
            })
          })
      }
    }
  })

	<ReactToastSnackProvider methods={methods} renderer={...}>
		<App />
	</ReactToastSnackProvider>
}
```

To use the custom `promise` method, just import `useToastSnack` and call it like any other internal method.

```jsx
// components/Elsewhere.js
import { useToastSnack } from 'react-toastsnack';

function Elsewhere() {
  const toastSnack = useToastSnack();

  // When the button is clicked, create a new promise
  // to display a loading notification, which will change whenever the request responds

  <button onClick={() => {
    toastSnack.promise({
      promise: fetch(puppies_url, { method: "POST" })
    })
  }}>
    Click here to buy puppies
  </button>
}
```

Note that the `duration`, `color` and `message` variables in this example are completely arbitrary.  
You have full control over any variables which are not `id`, `open` or `offset`.

### dismiss

`?boolean`: Whether or not we should dismiss active notifications to display new ones, if the `max` count has been reached.

Default: `false`

### initial

`?Array<ToastSnack>`: A list of initial notifications.

Default: `[]`

### height

`?number`: The default assumed height for calculating offsets. This can be overwritten by using the `onUpdate` function.

Default: `48`

### offset

`?number`: The offset and distance between notifications.

Default: `8`

### delay

`?number`: The transition delay; How long to wait between a dismissal and queueing the next notification.

Default: `400`

### max

`?number`: The maximum number of concurrent notifications.

Default: `null`

## Credits

react-toastsnack is built and maintained by **babangsund**.  
[@blog](https://babangsund.com/).  
[@github](https://github.com/babangsund).  
[@twitter](https://twitter.com/babangsund).  
