// @flow

'use strict';

import React from 'react';

function useDuration(
  id: string,
  open: boolean,
  duration: number,
  onClose: (id: string) => void,
): void {
  const timer = React.useRef();

  const startTimer = React.useCallback(() => {
    if (!duration || !onClose) return;
    timer.current = setTimeout(() => onClose(id), duration);
  }, []);

  React.useEffect(() => {
    if (open) startTimer();
    return () => clearTimeout(timer.current);
  }, [open]);
}

export default useDuration;
