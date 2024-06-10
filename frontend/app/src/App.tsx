import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import AppRouter from './components/common/AppRouter.tsx';

function App() {
  return (
    <MantineProvider>
      <AppRouter />
    </MantineProvider>
  );
}

export default App;
