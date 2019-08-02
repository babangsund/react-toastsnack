// @flow

'use strict';

const React = require('react');
const invariant = require('invariant');

type ToastSnackOptions = {
  open: boolean,
  persist: boolean,
  duration?: number,
};

type ToastSnackCreate = {
  id?: string,
  options: ToastSnackOptions,
};

interface ToastSnack {
  getId(): string;
  getOptions(): ToastSnackOptions;
  setOptions(ToastSnackOptions): void;
}

interface ToastSnackQueue {
  enqueue(ToastSnackCreate): string;
  dequeue(): ?ToastSnack;
}

class ReactToastSnack implements ToastSnack {
  _id;
  _options;
  static _count = 0;

  constructor({id, options}: ToastSnackCreate) {
    this._id = id || this._generateId();
    this._options = {
      open: true,
      ...this._composeOptions(options),
    };
  }

  getId() {
    return this._id;
  }

  getOptions() {
    return this._options;
  }

  setOptions(options: ToastSnackOptions) {
    this._options = {
      ...this._options,
      ...this._composeOptions(options),
    };
  }

  _generateId() {
    return 'ReactToastSnack:' + ReactToastSnack._count++;
  }

  _composeOptions(options) {
    return {
      ...options,
      ...(options.persist ? {duration: undefined} : {}),
    };
  }
}

class ReactToastSnackQueue implements ToastSnackQueue {
  _queue: Array<ToastSnack>;
  _max: ?number;

  constructor(toastSnacks?: Array<ToastSnack> = [], max) {
    this._max = max;
    this._queue = toastSnacks;
  }

  _enqueue(toastSnack) {
    this._queue.push(toastSnack);
  }

  _dequeue() {
    return this._queue.shift();
  }

  enqueue(input: ToastSnackCreate) {
    const toastSnack = new ReactToastSnack(input);
    this._enqueue(toastSnack);
    return toastSnack.getId();
  }

  dequeue() {
    if (this._queue.length > 0) {
      return this._dequeue();
    }
    return null;
  }
}

type ToastSnackProvider = {};

const ReactToastSnackContext = React.createContext<?ToastSnackProvider>(
  undefined,
);

function useToastSnack() {
  const context = React.useContext(ReactToastSnackContext);
  invariant(
    context !== undefined,
    '[useToastSnack]: ReactToastSnackContext is undefined',
  );
  return context;
}

function withToastSnack(Component) {
  return React.forwardRef((props, ref) => {
    const toastSnack = useToastSnack();
    return <Component {...props} ref={ref} toastSnack={toastSnack} />;
  });
}

function ReactToastSnackProvider({children, renderer, initial}) {
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
          toastSnack.setOptions(input);
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
