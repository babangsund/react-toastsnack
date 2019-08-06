// @flow

'use strict';

import React from 'react';

import ReactToastSnackQueue from './ReactToastSnackQueue';
import ReactToastSnackContext from './ReactToastSnackContext';
import ReactToastSnackReducer from './ReactToastSnackReducer';
import type {ReactToastSnackProviderProps} from './ReactToastSnackTypes.js';

function ReactToastSnackProvider({
  max,
  delay,
  offset,
  height,
  initial,
  dismiss,
  children,
  renderer,
  methods = {},
}: ReactToastSnackProviderProps) {
  const [toastSnacks, dispatch] = React.useReducer(ReactToastSnackReducer, []);
  const Q = React.useRef(
    new ReactToastSnackQueue(initial, max, dismiss, delay, height, offset),
  );

  const onCreate = React.useCallback(input => {
    const queue = Q.current;

    dispatch({queue, type: 'enqueue', input});

    return queue.getLast()?.id;
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

  const context = React.useMemo(() => {
    return {
      create: onCreate,
      update: onUpdate,
      ...Object.keys(methods).reduce((p, c) => {
        p[c] = methods[c](onCreate, onUpdate);
        return p;
      }, {}),
    };
  }, [onCreate, onUpdate, methods]);

  return (
    <ReactToastSnackContext.Provider value={context}>
      {children}
      {toastSnacks.map(toastSnack => {
        return React.createElement(renderer, {
          key: toastSnack.id,
          toastSnack,
          onUpdate,
          onExited,
          onClose,
        });
      })}
    </ReactToastSnackContext.Provider>
  );
}

export default ReactToastSnackProvider;
