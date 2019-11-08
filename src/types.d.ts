type ActionType = 'enqueue' | 'dequeue' | 'update' | 'exited';

type Action = {
  queue: ToastSnackQueue;
  type: ActionType;
  input: ToastSnackCreate | ToastSnackUpdate;
};

type ToastSnackCreate = {
  id?: string;
} & ToastSnackProperties;

type ToastSnackUpdate = {
  id: string;
} & ToastSnackProperties;

type ToastSnackProperties = {
  id?: string;
  open?: boolean;
  height?: number;
};

type ToastSnack = {
  id: string;
  open: boolean;
  height: number;
};

type Create = (input: ToastSnackCreate) => string | null;
type Update = (input: ToastSnackUpdate) => void;
type Method = (onCreate: Create, onUpdate: Update) => unknown;

type ToastSnackProvider = {
  create: Create;
  update: Update;
  [key: string]: Method;
};

type ReactToastSnackProviderProps = {
  max?: number;
  children: Node;
  delay?: number;
  offset?: number;
  height?: number;
  dismiss?: boolean;
  renderer: React.ReactComponent;
  initial?: Array<ToastSnackCreate>;
  methods: {
    [key: string]: Method;
  };
};

type ToastSnackSettings = {
  max?: number;
  delay: number;
  height: number;
  offset: number;
  dismiss: boolean;
};

interface ToastSnackQueue {
  getLast(): ToastSnack | null;
  getLength(): number;
  getSettings(): ToastSnackSettings;
  enqueue(input: ToastSnackCreate): string;
  dequeue(): ToastSnack | null;
}
