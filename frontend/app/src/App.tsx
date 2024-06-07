import '@mantine/core/styles.css';
import { Button, MantineProvider } from '@mantine/core';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return (
    <MantineProvider>
      <div className="counter">
        <p>Current count: {count}</p>
        <Button onClick={increment}>Increment</Button>
      </div>
    </MantineProvider>
  )
}

export default App
