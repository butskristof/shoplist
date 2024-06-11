import { FC } from 'react';
import ShoplistItem from '@/components/shoplist-item/ShoplistItem.tsx';

interface Props {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
}

const Shoplist: FC<Props> = ({ name, items }) => (
  <div>
    <h1>{name}</h1>
    <ul>
      {items.map((i) => (
        <li key={i.id}>
          <ShoplistItem item={i} />
        </li>
      ))}
    </ul>
  </div>
);

export default Shoplist;
