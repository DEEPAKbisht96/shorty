import api from '@/network/api_config';
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type HttpMethod = 'post' | 'put' | 'patch' | 'delete';

interface UseApiMutationProps<TData, TVariables> {
  url: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  options?: UseMutationOptions<TData, AxiosError, TVariables>;
}

export function useApiMutation<TData = unknown, TVariables = unknown>({
  url,
  method = 'post',
  headers = {},
  options = {},
}: UseApiMutationProps<TData, TVariables>): UseMutationResult<TData, AxiosError, TVariables> {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      const response = await api[method]<TData>(url, variables, {
        headers: {
          ...headers,
        },
      });
      return response.data;
    },
    ...options,
  });
}