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
  }, [duration, onClose]);

  React.useEffect(() => {
    if (open) startTimer();
    return () => clearTimeout(timer.current);
  }, [open, startTimer]);
}

export default useDuration;
