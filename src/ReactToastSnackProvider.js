// @flow

'use strict';

import React from 'react';

import ReactToastSnackQueue from './ReactToastSnackQueue';
import ReactToastSnackContext from './ReactToastSnackContext';
import ReactToastSnackReducer from './ReactToastSnackReducer';
import {DEFAULT_HEIGHT, DEFAULT_OFFSET, DEFAULT_DURATION} from './Constants';
import type {
  ToastSnack,
  ReactToastSnackProviderProps,
} from './ReactToastSnackTypes.js';

function ReactToastSnackProvider({
  max,
  delay,
  initial,
  dismiss,
  children,
  renderer,
  offset,
  height,
  duration,
}: ReactToastSnackProviderProps) {
  const [toastSnacks, dispatch] = React.useReducer(ReactToastSnackReducer, []);
  const Q = React.useRef(
    new ReactToastSnackQueue(
      initial,
      max,
      dismiss,
      delay,
      height,
      offset,
      duration,
    ),
  );

  const onCreate = React.useCallback(input => {
    const queue = Q.current;

    dispatch({queue, type: 'enqueue', input});

    return queue.last()?.id;
  }, []);

  const onUpdate = React.useCallback(input => {
    const queue = Q.current;

    dispatch({queue, type: 'update', input});
  }, []);

  const onClose = React.useCallback((id: string) => {
    const queue = Q.current;

    dispatch({queue, type: 'update', input: {id, open: false}});
  }, []);

  const onExited = React.useCallback((id: string) => {
    const queue = Q.current;

    dispatch({queue, type: 'exited', input: {id}});
  }, []);

  const context = React.useMemo(
    () => ({
      create: onCreate,
      update: onUpdate,
    }),
    [onCreate, onUpdate],
  );

  return (
    <ReactToastSnackContext.Provider value={context}>
      {children}
      {toastSnacks.map(toastSnack => {
        return React.createElement(renderer, {
          ...toastSnack,
          onUpdate,
          onExited,
          onClose,
        });
      })}
    </ReactToastSnackContext.Provider>
  );
}

export default ReactToastSnackProvider;
