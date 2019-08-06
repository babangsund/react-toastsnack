// @flow

'use strict';

import React from 'react';
import invariant from 'invariant';
import type {AbstractComponent} from 'react';

import ReactToastSnackContext from './ReactToastSnackContext';

function withToastSnack<Config: {}>(
  Component: AbstractComponent<Config>,
): AbstractComponent<Config> {
  return React.forwardRef((props, ref) => (
    <ReactToastSnackContext.Consumer>
      {context => {
        invariant(
          context !== undefined,
          '[withToastSnack]: ReactToastSnackContext is undefined',
        );
        return <Component {...props} ref={ref} toastSnack={context} />;
      }}
    </ReactToastSnackContext.Consumer>
  ));
}

export default withToastSnack;
