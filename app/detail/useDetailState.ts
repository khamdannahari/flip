import { createState } from "../utils/createState";
import { DetailProps } from "./Detail";

type DetailState = {
  detail: DetailProps;
};

const initialState: DetailState = {
  detail: {} as DetailProps,
};

// _useDetailState : setter exposed
// useDetailState : setter not exposed
export const { _state: _useDetailState, state: useDetailState } =
  createState(initialState);
