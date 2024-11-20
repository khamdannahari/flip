import fetchApi from "@/network/fetchApi";
import { endpoint } from "@/network/endpoint";
import { apiMethod } from "@/network/apiMethod";

type TransactionStatus = "PENDING" | "SUCCESS";

interface Transaction {
  id: string;
  amount: number;
  unique_code: number;
  status: TransactionStatus;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
}

export type TransactionsResponse = Record<string, Transaction>;

export const fetchTransactions = async () => {
  const options = {
    method: apiMethod.GET,
  };

  return fetchApi<TransactionsResponse>(endpoint.transactions, options);
};
