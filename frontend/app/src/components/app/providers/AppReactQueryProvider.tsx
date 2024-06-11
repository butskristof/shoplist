import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from '@/types/PropsWithChildren.ts';

const queryClient = new QueryClient();

const AppReactQueryProvider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools buttonPosition="bottom-left" />
  </QueryClientProvider>
);

export default AppReactQueryProvider;
