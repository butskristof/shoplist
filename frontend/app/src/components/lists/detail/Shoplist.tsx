import { FC } from 'react';
import { ShoplistWithItems } from '@/types/shoplists-api.types.ts';
import ShoplistItem from '@/components/lists/detail/ShoplistItem.tsx';
import classes from './Shoplist.module.scss';

interface Props {
  list: ShoplistWithItems;
}

const Shoplist: FC<Props> = ({ list }) => (
  <div>
    <h1 className={classes.name}>{list.name}</h1>
    <div className={classes.list}>
      {list.items.map((i) => (
        <ShoplistItem
          item={i}
          key={i.id}
        />
      ))}
    </div>
  </div>
);

export default Shoplist;
