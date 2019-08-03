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
    case 'enqueue':
    case 'dequeue': {
      if (type === 'enqueue') {
        queue.enqueue(input);
      }

      const toastSnack = queue.dequeue(toastSnacks.length);

      if (toastSnack) {
        return [...toastSnacks, toastSnack];
      }

      break;
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

      break;
    }
    default: {
      break;
    }
  }

  return toastSnacks;
}

export default ReactToastSnackReducer;
