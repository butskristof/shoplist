import AppMantineProvider from '@/components/app/providers/AppMantineProvider.tsx';
import AppReactQueryProvider from '@/components/app/providers/AppReactQueryProvider.tsx';
import AppRouterProvider from '@/components/app/providers/AppRouterProvider.tsx';

const AppProviders = () => (
  <AppMantineProvider>
    <AppReactQueryProvider>
      <AppRouterProvider />
    </AppReactQueryProvider>
  </AppMantineProvider>
);

export default AppProviders;
