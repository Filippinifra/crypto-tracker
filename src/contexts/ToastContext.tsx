import { createContext, FC, useCallback, useContext, useState } from "react";
import { Toast, ToastType } from "types/toastType";
import { v4 as uuidv4 } from "uuid";

export interface ToastInterface {
  toasts: { type: ToastType; message: string; id: string }[];
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastInterface>({ toasts: [], showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: FC = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = uuidv4();

    setToasts((state) => {
      setTimeout(() => {
        setToasts((state) => state.filter(({ id: toastId }) => toastId !== id));
      }, 4000);

      return [...state, { message, type, id }];
    });
  }, []);

  return <ToastContext.Provider value={{ toasts, showToast }}>{children}</ToastContext.Provider>;
};
