import { ToastProps } from "@/components/Toast";
import { create, StoreApi, UseBoundStore } from "zustand";

type GeneralState<T> = T & {
  toastProps?: ToastProps;
};

type FunctionState<T> = {
  getState: () => AllState<T>;
  setState: (partialState: Partial<AllState<T>>) => void;
  resetState: () => void;
};

type AllState<T> = GeneralState<T> & FunctionState<T>;

export const createState = <T>(initialState: GeneralState<T>) => {
  const store = create<AllState<T>>((setState, getState) => {
    const resetState = () => {
      setState((state) => ({
        ...state,
        ...initialState,
      }));
    };

    return {
      ...initialState,
      getState,
      setState,
      resetState,
    };
  });

  return {
    _state: store,
    state: store as UseBoundStore<StoreApi<GeneralState<T>>>,
  };
};
