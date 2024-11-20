import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "https://recruitment-test.flip.id";

/* eslint-disable no-unused-vars */
export enum ResponseStatus {
  initial = "initial",
  loading = "loading",
  success = "success",
  error = "error",
}

export interface ApiResponse<T> {
  code: number;
  status: ResponseStatus;
  message: string;
  data: T | null;
}

export const initialApiResponse = {
  code: 0,
  status: ResponseStatus.initial,
  message: "",
  data: null,
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
  return {
    code: response.status,
    status:
      response.status === 200 ? ResponseStatus.success : ResponseStatus.error,
    message:
      response.status === 200 ? "Request successful" : "Something went wrong",
    data: response.status === 200 ? response.data : null,
  };
};

const fetchApi = async <T>(
  url: string,
  options: AxiosRequestConfig = {},
  mockResponse?: ApiResponse<T>,
): Promise<ApiResponse<T>> => {
  if (mockResponse) {
    const networkDelaySimulation = 2000;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockResponse);
      }, networkDelaySimulation);
    });
  }

  try {
    const response = await axiosInstance.request({ url, ...options });
    return handleResponse<T>(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        code: 400,
        status: ResponseStatus.error,
        message: error.message || "Network error or request failed",
        data: null,
      };
    }

    return {
      code: 400,
      status: ResponseStatus.error,
      message: "An unexpected error occurred",
      data: null,
    };
  }
};

export default fetchApi;
