import { useCallback, useEffect } from "react";
import { useRouter } from "expo-router";
import { _useMainState } from "./useMainState";
import { ResponseStatus } from "@/network/fetchApi";
import { ToastType } from "@/components/Toast";
import { page } from "@/constants/pages";
import { useDetailHub } from "../detail/useDetailHub";
import { fetchTransactions } from "./mainApi";

// all main page logic is here
export const useMainAction = () => {
  const router = useRouter();
  const detailHub = useDetailHub();

  const getState = _useMainState((state) => state.getState);
  const setState = _useMainState((state) => state.setState);

  const search = _useMainState((state) => state.search);
  const debouncedSearch = _useMainState((state) => state.debouncedSearch);
  const sortId = _useMainState((state) => state.sortId);
  const transactionsResponse = _useMainState(
    (state) => state.transactionsResponse,
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      setState({ search });
    },
    [setState],
  );

  const onPressSort = useCallback(() => {
    const { showSortPopup } = getState();
    setState({ showSortPopup: !showSortPopup });
  }, [getState, setState]);

  const onCloseSort = useCallback(() => {
    setState({ showSortPopup: false });
  }, [setState]);

  const onSelectSort = useCallback(
    (sortId: string) => {
      setState({ sortId, showSortPopup: false });
    },
    [setState],
  );

  const onPressItem = useCallback(
    (id: string) => {
      const { transactionList } = getState();

      const detail = transactionList.find((item) => item.id === id);

      if (detail) {
        detailHub.onMainOpenDetail(detail);
        router.push(page.detail);
      }
    },

    [detailHub, getState, router],
  );

  const getTransactions = useCallback(async () => {
    const { transactionsResponse } = getState();

    setState({
      transactionsResponse: {
        ...transactionsResponse,
        status: ResponseStatus.loading,
      },
    });

    const _transactionsResponse = await fetchTransactions();

    const isSuccess = _transactionsResponse.status === ResponseStatus.success;

    setState({
      transactionsResponse: _transactionsResponse,
      toastProps: {
        type: ToastType.error,
        message: _transactionsResponse.message,
        triggerShow: isSuccess ? undefined : new Date(),
      },
    });
  }, [getState, setState]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  useEffect(() => {
    const isLoading = transactionsResponse.status === ResponseStatus.loading;
    setState({ isLoading });
  }, [setState, transactionsResponse.status]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setState({ debouncedSearch: search });
    }, 100); // Delay selama 100ms

    return () => {
      clearTimeout(handler);
    };
  }, [search, setState]);

  useEffect(() => {
    const transactionListOriginal = transactionsResponse?.data
      ? Object.values(transactionsResponse.data).map((transaction) => ({
          id: transaction.id,
          senderBank: transaction.sender_bank,
          beneficiaryBank: transaction.beneficiary_bank,
          beneficiaryName: transaction.beneficiary_name,
          accountNumber: transaction.account_number,
          amount: transaction.amount.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }),
          remark: transaction.remark,
          uniqueCode: transaction.unique_code.toString(),
          createdDate: new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(new Date(transaction.created_at.replace(" ", "T"))),
          createdAt: new Date(transaction.created_at.replace(" ", "T")),
          isSuccess: transaction.status === "SUCCESS",
        }))
      : [];

    const transactionListFiltered = transactionListOriginal.filter(
      (transaction) => {
        const searchLower = debouncedSearch.toLowerCase();

        return (
          transaction.beneficiaryName.toLowerCase().includes(searchLower) ||
          transaction.senderBank.toLowerCase().includes(searchLower) ||
          transaction.beneficiaryBank.toLowerCase().includes(searchLower) ||
          transaction.amount
            .replace(".", "")
            .toLowerCase()
            .includes(searchLower)
        );
      },
    );

    const sortTransactions = (sortId: string) => {
      const transactionListSorted = [...transactionListFiltered];

      switch (sortId) {
        case "1": // Nama A-Z
          transactionListSorted.sort((a, b) =>
            a.beneficiaryName.localeCompare(b.beneficiaryName),
          );
          break;
        case "2": // Nama Z-A
          transactionListSorted.sort((a, b) =>
            b.beneficiaryName.localeCompare(a.beneficiaryName),
          );
          break;
        case "3": // Tanggal Terbaru
          transactionListSorted.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
          );
          break;
        case "4": // Tanggal Terlama
          transactionListSorted.sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
          );
          break;
        default:
          break;
      }

      return transactionListSorted;
    };

    const transactionListSorted = sortTransactions(sortId);

    setState({ transactionList: transactionListSorted });
  }, [debouncedSearch, setState, sortId, transactionsResponse.data]);

  return {
    onChangeSearch,
    onPressSort,
    onCloseSort,
    onSelectSort,
    onPressItem,
  };
};
