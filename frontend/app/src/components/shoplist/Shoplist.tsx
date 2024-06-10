import { FC } from 'react';
import ShoplistItem from '../shoplist-item/ShoplistItem.tsx';

interface Props {
  name: string;
  items: string[];
}

const Shoplist: FC<Props> = ({ name, items }) => (
  <div>
    <h2>{name}</h2>
    <ul>
      {items.map((i) => (
        <li key={i}>
          <ShoplistItem name={i} />
        </li>
      ))}
    </ul>
  </div>
);

export default Shoplist;
