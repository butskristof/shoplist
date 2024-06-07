import '@mantine/core/styles.css';
import { Button, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import AppLayout from './components/layout/app-layout/AppLayout.tsx';

function App() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return (
    <MantineProvider>
      <AppLayout>
        <div className="counter">
          <p>Current count: {count}</p>
          <Button onClick={increment}>Increment</Button>
          {/* eslint-disable-next-line no-constant-binary-expression */}
          {false &&
            Array(100)
              .fill('some content')
              .map((c, i) => <p key={i}>{c}</p>)}
        </div>
      </AppLayout>
    </MantineProvider>
  );
}

export default App;
