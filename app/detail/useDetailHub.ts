import { useCallback } from "react";
import { _useDetailState } from "./useDetailState";
import { DetailProps } from "./Detail";

// use this hook for set detail state from another page
export const useDetailHub = () => {
  const setState = _useDetailState((state) => state.setState);

  const onMainOpenDetail = useCallback(
    (detail: DetailProps) => {
      setState({ detail });
    },
    [setState],
  );

  return { onMainOpenDetail };
};
