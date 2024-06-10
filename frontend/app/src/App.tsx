import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Shoplist from './components/shoplist/Shoplist.tsx';

const LIST = {
  name: 'Groceries',
  items: ['Pesto', 'Penne'],
};

function App() {
  return (
    <MantineProvider>
      <div className="counter">
        <Shoplist
          name={LIST.name}
          items={LIST.items}
        />
      </div>
    </MantineProvider>
  );
}

export default App;
