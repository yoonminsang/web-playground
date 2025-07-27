import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';

import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';

import { CommonErrorUI } from '@/components/CommonErrorUI';
import { Loading } from '@/components/Loading';
import { logError } from '@/libs';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false, staleTime: Infinity, gcTime: 0 } },
});

export const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            onError={(error, info) => {
              logError(new Error('RootLayout에서 에러 발생'), { error, info, level: 'fatal' });
            }}
            fallbackRender={({ error, resetErrorBoundary }) => (
              <CommonErrorUI error={error} onResetError={resetErrorBoundary} />
            )}
          >
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
};
