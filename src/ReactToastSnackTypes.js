// @flow

'use strict';

import type {Node} from 'react';

export type ActionType = 'enqueue' | 'dequeue' | 'update';

export type Action = {
  queue: ToastSnackQueue,
  type: ActionType,
  input: ToastSnackCreate | ToastSnackUpdate,
};

export type ToastSnackCreate = {
  id?: string,
  ...ToastSnackProperties,
};

export type ToastSnackUpdate = {
  id: string,
  ...ToastSnackProperties,
};

export type ToastSnackProperties = {
  open?: boolean,
  height?: number,
  persist?: boolean,
  duration?: number,
};

export type ToastSnack = {
  id: string,
  open: boolean,
  height: number,
  persist: boolean,
  duration: number,
};

export type ToastSnackProvider = {
  create: ToastSnackCreate => string,
  update: ToastSnackUpdate => void,
  delete: string => void,
};

export type ReactToastSnackProviderProps = {
  max?: number,
  children: Node,
  dismiss?: boolean,
  renderer: any => any,
  defaultHeight?: number,
  defaultDuration?: number,
  initial?: Array<ToastSnackCreate>,
};

export interface ToastSnackQueue {
  peek(): ?string;
  enqueue(ToastSnackCreate): string;
  dequeue(current: number): ?ToastSnack;
}
