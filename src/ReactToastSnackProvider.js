// @flow

'use strict';

import React from 'react';

import ReactToastSnackQueue from './ReactToastSnackQueue';
import ReactToastSnackContext from './ReactToastSnackContext';
import ReactToastSnackReducer from './ReactToastSnackReducer';
import type {
  ToastSnack,
  ReactToastSnackProviderProps,
} from './ReactToastSnackTypes.js';

function ReactToastSnackProvider({
  max,
  initial,
  dismiss,
  children,
  renderer,
  defaultHeight,
  defaultDuration,
}: ReactToastSnackProviderProps) {
  const [toastSnacks, dispatch] = React.useReducer(ReactToastSnackReducer, []);
  const Q = React.useRef(
    new ReactToastSnackQueue(
      initial,
      max,
      dismiss,
      defaultHeight,
      defaultDuration,
    ),
  );

  const onCreate = React.useCallback(input => {
    const queue = Q.current;

    dispatch({queue, type: 'enqueue', input});
  }, []);

  const onUpdate = React.useCallback(input => {
    const queue = Q.current;

    dispatch({queue, type: 'update', input});
  }, []);

  const onDelete = React.useCallback((id: string) => {
    const queue = Q.current;

    dispatch({queue, type: 'dequeue', input: {id}});
  }, []);

  const context = React.useMemo(
    () => ({
      create: onCreate,
      update: onUpdate,
      delete: onDelete,
    }),
    [onCreate, onUpdate, onDelete],
  );

  return (
    <ReactToastSnackContext.Provider value={context}>
      {children}
      {toastSnacks.map(toastSnack => {
        return React.createElement(renderer, toastSnack);
      })}
    </ReactToastSnackContext.Provider>
  );
}

export default ReactToastSnackProvider;
