// @flow

'use strict';

import type {Node} from 'react';

export type ActionType = 'enqueue' | 'dequeue' | 'update' | 'exited';

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
};

export type ToastSnack = {
  id: string,
  open: boolean,
  height: number,
};

export type ToastSnackProvider = {
  create: ToastSnackCreate => ?string,
  update: ToastSnackUpdate => void,
};

export type ReactToastSnackProviderProps = {
  max?: number,
  children: Node,
  delay?: number,
  offset?: number,
  height?: number,
  dismiss?: boolean,
  renderer: any => any,
  initial?: Array<ToastSnackCreate>,
  methods: {
    [key: string]: (
      (ToastSnackCreate) => ?string,
      (ToastSnackUpdate) => void,
    ) => (ToastSnackCreate | ToastSnackUpdate) => {},
  },
};

export type ToastSnackSettings = {
  max: number,
  delay: number,
  height: number,
  offset: number,
  dismiss: boolean,
};

export interface ToastSnackQueue {
  getLast(): ?ToastSnack;
  getLength(): number;
  getSettings(): ToastSnackSettings;
  enqueue(ToastSnackCreate): string;
  dequeue(): ?ToastSnack;
}
