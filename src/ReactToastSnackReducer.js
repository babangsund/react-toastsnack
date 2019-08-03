// @flow

'use strict';

import type {
  Action,
  ToastSnack,
  ToastSnackQueue,
} from './ReactToastSnackTypes.js';

function offsets(toastSnacks: Array<ToastSnack>, offset: number) {
  let totalOffset = offset * 3;
  let index = 0;

  const offsets = {};

  while (toastSnacks[index + 1]) {
    const prevHeight = toastSnacks[index + 1].height;
    const newOffset = totalOffset + prevHeight + offset;

    offsets[index + 1] = newOffset;

    totalOffset = newOffset;
    index += 1;
  }

  return toastSnacks.map((x, i) => ({...x, offset: offsets[i] || 0}));
}

function ReactToastSnackReducer(
  toastSnacks: Array<ToastSnack>,
  action: Action,
): any {
  const {queue, input, type} = action;
  const settings = queue.settings();

  let newToastSnacks: ?Array<ToastSnack> = null;

  function dequeue() {
    const toastSnack = queue.dequeue(toastSnacks.length);

    if (toastSnack) {
      newToastSnacks = [...toastSnacks, toastSnack];
    }
  }

  switch (type) {
    case 'enqueue':
    case 'dequeue': {
      if (type === 'enqueue') {
        queue.enqueue(input);
      }

      dequeue();

      break;
    }
    case 'update': {
      const toastSnack = toastSnacks.find(x => x.id === input.id);
      const {id, ...properties} = input;

      if (toastSnack) {
        newToastSnacks = toastSnacks.map(toastSnack =>
          toastSnack.id !== input.id
            ? toastSnack
            : {
                ...toastSnack,
                ...properties,
              },
        );
      }

      break;
    }
    case 'exited': {
      const toastSnack = toastSnacks.find(x => x.id === input.id);

      if (toastSnack) {
        newToastSnacks = toastSnacks.filter(x => x.id !== input.id);

        const timeout = setTimeout(() => {
          dequeue();
          clearTimeout(timeout);
        }, settings.delay);
      }

      break;
    }
    default: {
      break;
    }
  }

  if (newToastSnacks) return offsets(newToastSnacks, settings.offset);
  else return toastSnacks;
}

export default ReactToastSnackReducer;
