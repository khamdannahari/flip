import { ToastType } from "@/components/Toast";
import { _useDetailState } from "./useDetailState";
import * as Clipboard from "expo-clipboard";
import { useCallback } from "react";
import { useRouter } from "expo-router";

// all detail page logic is here
export const useDetailAction = () => {
  const router = useRouter();

  const getState = _useDetailState((state) => state.getState);
  const setState = _useDetailState((state) => state.setState);

  const onCopy = useCallback(async () => {
    const { detail } = getState();

    await Clipboard.setStringAsync(detail.id);

    setState({
      toastProps: {
        type: ToastType.success,
        message: "ID Transaksi tersalin",
        triggerShow: new Date(),
      },
    });
  }, [getState, setState]);

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  return { onCopy, onClose };
};
