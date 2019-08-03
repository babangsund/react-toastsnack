// @flow

'use strict';

import React from 'react';
import invariant from 'invariant';

import ReactToastSnackContext from './ReactToastSnackContext';
import {
  DEFAULT_DELAY,
  DEFAULT_HEIGHT,
  DEFAULT_OFFSET,
  DEFAULT_DURATION,
} from './Constants';
import type {
  ToastSnack,
  ToastSnackQueue,
  ToastSnackCreate,
  ToastSnackSettings,
} from './ReactToastSnackTypes';

class ReactToastSnackQueue implements ToastSnackQueue {
  _queue: Array<ToastSnack>;
  _last: ?ToastSnack;

  _max: ?number;
  _delay: number;
  _height: number;
  _offset: number;
  _dismiss: boolean;
  _duration: number;

  static _count = 0;

  constructor(
    initial?: Array<ToastSnackCreate> = [],
    max?: number,
    dismiss: boolean = false,
    delay: number = DEFAULT_DELAY,
    height: number = DEFAULT_HEIGHT,
    offset: number = DEFAULT_OFFSET,
    duration: number = DEFAULT_DURATION,
  ) {
    this._max = max;
    this._delay = delay;
    this._height = height;
    this._offset = offset;
    this._dismiss = dismiss;
    this._duration = duration;
    this._queue = initial ? initial.map(this.formatInput) : [];
  }

  _enqueue(toastSnack: ToastSnack) {
    this._queue.push(toastSnack);
  }

  _dequeue() {
    const last = this._queue.shift();
    return last;
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

  last() {
    return this._last;
  }

  settings() {
    return {
      max: this._max,
      delay: this._delay,
      offset: this._offset,
      height: this._height,
      dismiss: this._dismiss,
      duration: this._duration,
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
        persist: false,
        height: this._height,
        duration: this._duration,
      },
      input,
    );
  }
}

export default ReactToastSnackQueue;
