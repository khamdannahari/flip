import { ApiResponse, initialApiResponse } from "@/network/fetchApi";
import { createState } from "../utils/createState";
import { TransactionsResponse } from "./mainApi";
import { TransactionItemProps } from "./childs/TransactionItem";

type MainState = {
  search: string;
  debouncedSearch: string;
  showSortPopup: boolean;
  sortId: string;
  isLoading: boolean;
  transactionList: TransactionItemProps[];
  transactionsResponse: ApiResponse<TransactionsResponse>;
};

const initialState: MainState = {
  search: "",
  debouncedSearch: "",
  showSortPopup: false,
  sortId: "",
  isLoading: false,
  transactionList: [],
  transactionsResponse: initialApiResponse,
};

// _useMainState : setter exposed
// useMainState : setter not exposed
export const { _state: _useMainState, state: useMainState } =
  createState(initialState);
