import React from 'react';
import invariant from 'invariant';

// project
import ReactToastSnackContext from './ReactToastSnackContext';

function useToastSnack(): ToastSnackProvider | undefined {
  const context = React.useContext(ReactToastSnackContext);
  invariant(
    context !== undefined,
    '[useToastSnack]: ReactToastSnackContext is undefined'
  );
  return context;
}

export default useToastSnack;
