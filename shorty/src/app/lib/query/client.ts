import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error.message?.includes('Unauthorized')) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
  },
});
