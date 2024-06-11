import '@mantine/core/styles.css';
import { CSSVariablesResolver, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppRoutes from './components/app/AppRoutes.tsx';

const queryClient = new QueryClient();

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--mantine-color-text': theme.colors.gray[8],
  },
  dark: {
    '--mantine-color-text': theme.white,
  },
});

function App() {
  return (
    <MantineProvider
      defaultColorScheme="auto"
      cssVariablesResolver={resolver}
    >
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
