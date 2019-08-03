// @flow

'use strict';

import type {
  Action,
  ToastSnack,
  ToastSnackQueue,
} from './ReactToastSnackTypes.js';

function ReactToastSnackReducer(
  toastSnacks: Array<ToastSnack>,
  action: Action,
): any {
  const {queue, input, type} = action;

  switch (type) {
    case 'enqueue': {
      queue.enqueue(input || {});
      break;
    }
    case 'dequeue': {
      const toastSnack = queue.dequeue(toastSnacks.length);

      if (toastSnack) {
        return [...toastSnacks, toastSnack];
      }
    }

    case 'update': {
      const toastSnack = toastSnacks.find(x => x.id === input.id);

      if (toastSnack) {
        return toastSnacks.map(toastSnack =>
          toastSnack.id !== input.id
            ? toastSnack
            : {
                ...toastSnack,
                input,
              },
        );
      }
    }
    default: {
      break;
    }
  }

  return toastSnacks;
}

export default ReactToastSnackReducer;
