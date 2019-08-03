// @flow

'use strict';

import React from 'react';
import invariant from 'invariant';

import ReactToastSnackContext from './ReactToastSnackContext';
import {DEFAULT_HEIGHT, DEFAULT_DURATION} from './Constants';
import type {
  ToastSnack,
  ToastSnackQueue,
  ToastSnackCreate,
} from './ReactToastSnackTypes';

class ReactToastSnackQueue implements ToastSnackQueue {
  _queue: Array<ToastSnack>;
  _max: ?number;
  _dismiss: boolean;
  _defaultHeight: number;
  _defaultDuration: number;

  static _count = 0;

  constructor(
    toastSnacks?: Array<ToastSnackCreate> = [],
    max?: number,
    dismiss: boolean = false,
    defaultHeight: number = DEFAULT_HEIGHT,
    defaultDuration: number = DEFAULT_DURATION,
  ) {
    this._max = max;
    this._dismiss = dismiss;
    this._defaultHeight = defaultHeight;
    this._defaultDuration = defaultDuration;
    this._queue = toastSnacks ? toastSnacks.map(this.formatInput) : [];
  }

  _enqueue(toastSnack: ToastSnack) {
    this._queue.push(toastSnack);
  }

  _dequeue() {
    return this._queue.shift();
  }

  peek() {
    return this._queue[this._queue.length - 1]?.id;
  }

  enqueue(input: ToastSnackCreate) {
    const toastSnack = this.formatInput(input);
    this._enqueue(toastSnack);
    return toastSnack.id;
  }

  dequeue(active: number) {
    if (this._queue.length === 0) return null;

    if (!this._max || active < this._max) {
      return this._dequeue();
    }

    return null;
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
        persist: false,
        height: this._defaultHeight,
        duration: this._defaultDuration,
      },
      input,
    );
  }
}

export default ReactToastSnackQueue;
