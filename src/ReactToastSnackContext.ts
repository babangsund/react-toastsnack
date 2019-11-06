import React from 'react';

const ReactToastSnackContext = React.createContext<
  ToastSnackProvider | undefined
>(undefined);

export default ReactToastSnackContext;
