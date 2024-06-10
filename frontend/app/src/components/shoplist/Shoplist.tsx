import { FC } from 'react';
import ShoplistItem from '../shoplist-item/ShoplistItem.tsx';

interface Props {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
}

const Shoplist: FC<Props> = ({ name, items }) => (
  <div>
    <h2>{name}</h2>
    <ul>
      {items.map((i) => (
        <li key={i.id}>
          <ShoplistItem name={i.name} />
        </li>
      ))}
    </ul>
  </div>
);

export default Shoplist;
