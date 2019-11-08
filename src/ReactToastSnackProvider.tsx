import React from 'react';

// project
import ReactToastSnackQueue from './ReactToastSnackQueue';
import ReactToastSnackContext from './ReactToastSnackContext';
import ReactToastSnackReducer from './ReactToastSnackReducer';

const ReactToastSnackProvider: React.FC<ReactToastSnackProviderProps> = ({
  max,
  delay,
  offset,
  height,
  initial,
  dismiss,
  children,
  renderer,
  methods = {},
}: ReactToastSnackProviderProps) => {
  const [toastSnacks, dispatch] = React.useReducer(ReactToastSnackReducer, []);
  const Q = React.useRef(
    new ReactToastSnackQueue(initial, max, dismiss, delay, height, offset)
  );

  const onCreate = React.useCallback((input: ToastSnackCreate):
    | string
    | null => {
    const queue = Q.current;
    dispatch({ queue, type: 'enqueue', input });
    const last = queue.getLast();
    return last && last.id;
  }, []);

  const onUpdate = React.useCallback((input: ToastSnackUpdate): void => {
    const queue = Q.current;
    dispatch({ queue, type: 'update', input });
  }, []);

  const onClose = React.useCallback((id: string) => {
    const queue = Q.current;
    dispatch({ queue, type: 'update', input: { id, open: false } });
  }, []);

  const onExited = React.useCallback((id: string) => {
    const queue = Q.current;
    dispatch({ queue, type: 'exited', input: { id } });
  }, []);

  const context = React.useMemo(() => {
    return {
      create: onCreate,
      update: onUpdate,
      ...Object.keys(methods).reduce(
        (p: { [key: string]: unknown }, c: string) => {
          p[c] = methods[c](onCreate, onUpdate);
          return p;
        },
        {}
      ),
    };
  }, [onCreate, onUpdate, methods]);

  return (
    <ReactToastSnackContext.Provider value={context}>
      {children}
      {toastSnacks.map((toastSnack: ToastSnack) => {
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
};

export default ReactToastSnackProvider;
