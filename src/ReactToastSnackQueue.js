// @flow

'use strict';

import React from 'react';
import invariant from 'invariant';

import ReactToastSnack from './ReactToastSnack';
import ReactToastSnackContext from './ReactToastSnackContext';
import type {
  ToastSnack,
  ToastSnackQueue,
  ToastSnackInput,
  ToastSnackOptions,
} from './ReactToastSnackTypes';

class ReactToastSnackQueue implements ToastSnackQueue {
  _queue: Array<ToastSnack>;
  _max: ?number;

  constructor(toastSnacks?: Array<ToastSnackInput> = [], max?: number) {
    this._max = max;
    this._queue = toastSnacks
      ? toastSnacks.map(input => new ReactToastSnack(input))
      : [];
  }

  _enqueue(toastSnack: ToastSnack) {
    this._queue.push(toastSnack);
  }

  _dequeue() {
    return this._queue.shift();
  }

  enqueue(input: ToastSnackInput) {
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

export default ReactToastSnackQueue;
