import type { AxiosError, RawAxiosRequestConfig } from "axios";
import axios from "axios";

type PayloadList = {
  page?: number;
  limit?: number;
};

export type Response<T = any> = {
  errors?: string[];
  message: string;
  code: number;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};

export type ResponseError = {
  errors?: string[];
  message: string;
  error_code: number;
  code: number;
};

export type ErrorResponse = AxiosError<ResponseError>;

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const fetcher = async <T, D = any>(requestConfig: RawAxiosRequestConfig<D>) => {
  try {
    const { data } = await instance.request<Response<T>>(requestConfig);
    return Promise.resolve(data);
  } catch (err) {
    const error = err as AxiosError<ResponseError>;
    throw error;
  }
};

export default fetcher;
