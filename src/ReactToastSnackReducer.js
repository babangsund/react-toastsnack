// @flow

'use strict';

import type {Action, ToastSnack} from './ReactToastSnackTypes.js';

function offsets(toastSnacks: Array<ToastSnack>, offset: number) {
  let totalOffset = offset * 3;
  let index = 0;

  const offsets = {};
  offsets[0] = totalOffset;

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
  const {max, dismiss, delay, offset} = queue.getSettings();

  let newToastSnacks: ?Array<ToastSnack> = null;

  function dequeue() {
    const isMax = max && toastSnacks.length >= max;
    let tempToastSnacks = toastSnacks;

    if (!queue.getLength() || (isMax && !dismiss)) {
      return null;
    }

    if (isMax) {
      [, ...tempToastSnacks] = toastSnacks;
    }

    const toastSnack = queue.dequeue();
    if (toastSnack) {
      return [...tempToastSnacks, toastSnack];
    }

    return null;
  }

  switch (type) {
    case 'enqueue':
    case 'dequeue': {
      if (type === 'enqueue') {
        queue.enqueue(input);
      }

      newToastSnacks = dequeue();

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
          newToastSnacks = dequeue();
          clearTimeout(timeout);
        }, delay);
      }

      break;
    }
    default: {
      break;
    }
  }

  if (newToastSnacks) return offsets(newToastSnacks, offset);
  else return toastSnacks;
}

export default ReactToastSnackReducer;
