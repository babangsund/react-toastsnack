import React from 'react';

function useDuration(
  id: string,
  open: boolean,
  duration: number,
  onClose: (id: string) => void
): void {
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  const startTimer = React.useCallback(() => {
    if (!duration || !onClose) {
      return;
    }
    timer.current = setTimeout(() => onClose(id), duration);
  }, [id, duration, onClose]);

  React.useEffect(() => {
    if (open) {
      startTimer();
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [open, startTimer]);
}

export default useDuration;
