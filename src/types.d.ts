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
  id: string;
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

type ToastSnackProvider = {
  create: Create;
  update: Update;
};

type ReactToastSnackProviderProps = {
  max?: number;
  children: Node;
  delay?: number;
  offset?: number;
  height?: number;
  dismiss?: boolean;
  renderer: (arg: any) => any;
  initial?: Array<ToastSnackCreate>;
  methods: {
    [key: string]: (
      onCreate: Create,
      onUpdate: Update
    ) => ToastSnackCreate | ToastSnackUpdate;
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
