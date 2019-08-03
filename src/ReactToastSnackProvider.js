// @flow
import React from 'react';

import ReactToastSnackQueue from './ReactToastSnackQueue';
import ReactToastSnackContext from './ReactToastSnackContext';
import type {ReactToastSnackProviderProps} from './ReactToastSnackTypes.js';

function ReactToastSnackProvider({
  children,
  renderer,
  initial,
}: ReactToastSnackProviderProps) {
  const queue = React.useRef(new ReactToastSnackQueue(initial));
  const [toastSnacks, setToastSnacks] = React.useState([]);

  const onCreate = React.useCallback(input => {
    const Q = queue.current;

    const id = Q.enqueue(input);
    const toastSnack = Q.dequeue();

    if (toastSnack !== null) {
      setToastSnacks(toastSnacks => [...toastSnacks, toastSnack]);
    }

    return id;
  }, []);

  const onUpdate = React.useCallback(input => {
    setToastSnacks(toastSnacks =>
      toastSnacks.map(toastSnack => {
        if (toastSnack.getId() === input.id) {
          toastSnack.setOptions(input.options);
        }
        return toastSnack;
      }),
    );
  }, []);

  const onDelete = React.useCallback(id => {
    setToastSnacks(toastSnacks =>
      toastSnacks.map(toastSnack => {
        if (toastSnack.getId() === id) {
          toastSnack.setOptions({...toastSnack.getOptions(), open: false});
        }
        return toastSnack;
      }),
    );
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
      {toastSnacks.map(renderer)}
    </ReactToastSnackContext.Provider>
  );
}

export default ReactToastSnackProvider;
