// @flow
import React from 'react';
import invariant from 'invariant';

import ReactToastSnackContext from './ReactToastSnackContext';

function useToastSnack() {
  const context = React.useContext(ReactToastSnackContext);
  invariant(
    context !== undefined,
    '[useToastSnack]: ReactToastSnackContext is undefined',
  );
  return context;
}

export default useToastSnack;
