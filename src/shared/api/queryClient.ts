import { QueryClient } from "@tanstack/react-query";

import { isApiError } from "./apiError";

const MINUTE_MS = 1000 * 60;
const QUERY_STALE_TIME = MINUTE_MS * 5;
const QUERY_GC_TIME = MINUTE_MS * 30;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_GC_TIME,
      retry: (failureCount, error) => {
        if (
          isApiError(error) &&
          error.status !== undefined &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }

        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});
