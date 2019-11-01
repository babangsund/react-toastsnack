// @flow

'use strict';

import {DEFAULT_DELAY, DEFAULT_HEIGHT, DEFAULT_OFFSET} from './Constants';
import type {
  ToastSnack,
  ToastSnackQueue,
  ToastSnackCreate,
} from './ReactToastSnackTypes';

class ReactToastSnackQueue implements ToastSnackQueue {
  _queue: Array<ToastSnack>;
  _last: ?ToastSnack;

  +_max: ?number;
  _delay: number;
  _height: number;
  _offset: number;
  _dismiss: boolean;

  static _count = 0;

  constructor(
    initial?: Array<ToastSnackCreate> = [],
    max?: ?number = null,
    dismiss?: boolean = false,
    delay?: number = DEFAULT_DELAY,
    height?: number = DEFAULT_HEIGHT,
    offset: number = DEFAULT_OFFSET,
  ) {
    this._max = max;
    this._delay = delay;
    this._height = height;
    this._offset = offset;
    this._dismiss = dismiss;
    this._queue = initial ? initial.map(this.formatInput) : [];
  }

  _enqueue(toastSnack: ToastSnack) {
    this._queue.push(toastSnack);
  }

  _dequeue() {
    const last = this._queue.shift();
    this._last = last;
    return last;
  }

  enqueue(input: ToastSnackCreate) {
    const toastSnack = this.formatInput(input);
    this._enqueue(toastSnack);
    return toastSnack.id;
  }

  dequeue() {
    if (this._queue.length === 0) {
      return null;
    }
    return this._dequeue();
  }

  getLast() {
    return this._last;
  }

  getLength() {
    return this._queue.length;
  }

  getSettings() {
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
      input,
    );
  }
}

export default ReactToastSnackQueue;
