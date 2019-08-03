import type {ToastSnack} from './ReactToastSnackTypes';

class ReactToastSnack implements ToastSnack {
  _id;
  _options;
  static _count = 0;

  constructor({id, options}: ToastSnackCreate) {
    this._id = id || this._generateId();
    this._options = {
      open: true,
      ...this._composeOptions(options),
    };
  }

  getId() {
    return this._id;
  }

  getOptions() {
    return this._options;
  }

  setOptions(options: ToastSnackOptions) {
    this._options = {
      ...this._options,
      ...this._composeOptions(options),
    };
  }

  _generateId() {
    return 'ReactToastSnack:' + ReactToastSnack._count++;
  }

  _composeOptions(options) {
    return {
      ...options,
      ...(options.persist ? {duration: undefined} : {}),
    };
  }
}

export default ReactToastSnack;
