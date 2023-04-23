export type CreateToastParams = {
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  backgroundColor?: string;
  icon?: JSX.Element;
  iconColor?: string;
  fontColor?: string;
  titleColor?: string;
  title?: string;
  authError?: boolean;
};

export type CreateToastFn = (arg0: CreateToastParams) => void;

export type ToastManagerProps = {
  bind: (arg: CreateToastFn) => void;
};

export type ToastCreateType = {
  id: number;
} & CreateToastParams;

export type ToastItemType = {
  id?: number;
  onDone: () => void;
} & CreateToastParams;
