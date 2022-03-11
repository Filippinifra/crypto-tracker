export type ToastType = "success" | "error" | "warning";

export interface Toast {
  message: string;
  type: ToastType;
  id: string;
}
