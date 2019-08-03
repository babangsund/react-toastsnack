// @flow

'use strict';

import type {Node} from 'react';

export type ToastSnackInput = {
  id?: string,
  options: ToastSnackOptions,
};

export type ToastSnackOptions = {
  open: boolean,
  persist: boolean,
  duration?: number,
};

export type ToastSnackProvider = {
  create: ToastSnackInput => string,
  update: ToastSnackInput => void,
  delete: string => void,
};

export type ReactToastSnackProviderProps = {
  children: Node,
  renderer: any => any,
  initial?: Array<ToastSnackInput>,
};

export interface ToastSnackQueue {
  enqueue(ToastSnackInput): string;
  dequeue(): ?ToastSnack;
}

export interface ToastSnack {
  getId(): string;
  getOptions(): ToastSnackOptions;
  setOptions(ToastSnackOptions): void;
}
