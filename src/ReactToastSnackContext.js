// @flow

import React from 'react';

import type {ToastSnackProvider} from './ReactToastSnackTypes';

const ReactToastSnackContext = React.createContext<?ToastSnackProvider>(
  undefined,
);

export default ReactToastSnackContext;
