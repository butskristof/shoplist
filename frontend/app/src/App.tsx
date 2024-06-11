import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './components/app/AppLayout.tsx';
import AppRoutes from './components/app/AppRoutes.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
