import { DEFAULT_DELAY, DEFAULT_HEIGHT, DEFAULT_OFFSET } from './Constants';

class ReactToastSnackQueue implements ToastSnackQueue {
  _queue: Array<ToastSnack>;
  _last: ToastSnack | null;

  _max: number;
  _delay: number;
  _height: number;
  _offset: number;
  _dismiss: boolean;

  static _count = 0;

  constructor(
    initial: Array<ToastSnackCreate> = [],
    max: number,
    dismiss = false,
    delay: number = DEFAULT_DELAY,
    height: number = DEFAULT_HEIGHT,
    offset: number = DEFAULT_OFFSET
  ) {
    this._max = max;
    this._last = null;
    this._delay = delay;
    this._height = height;
    this._offset = offset;
    this._dismiss = dismiss;
    this._queue = initial ? initial.map(this.formatInput) : [];
  }

  _enqueue(toastSnack: ToastSnack): void {
    this._queue.push(toastSnack);
  }

  _dequeue(): ToastSnack | null {
    const last = this._queue.shift() || null;
    this._last = last;
    return last;
  }

  enqueue(input: ToastSnackCreate): string {
    const toastSnack = this.formatInput(input);
    this._enqueue(toastSnack);
    return toastSnack.id;
  }

  dequeue(): ToastSnack | null {
    if (this._queue.length === 0) {
      return null;
    }
    return this._dequeue();
  }

  getLast(): ToastSnack | null {
    return this._last;
  }

  getLength(): number {
    return this._queue.length;
  }

  getSettings(): ToastSnackSettings {
    return {
      max: this._max,
      delay: this._delay,
      offset: this._offset,
      height: this._height,
      dismiss: this._dismiss,
    };
  }

  formatInput(input: ToastSnackCreate): ToastSnack {
    const id =
      typeof input.id === 'string'
        ? input.id
        : 'ReactToastSnack:' + ReactToastSnackQueue._count++;

    return Object.assign(
      {
        id,
        open: true,
        height: this._height,
      },
      input
    );
  }
}

export default ReactToastSnackQueue;
