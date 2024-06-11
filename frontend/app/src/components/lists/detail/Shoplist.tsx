import { FC } from 'react';
import { ShoplistWithItems } from '@/types/shoplists-api.types.ts';
import ShoplistItem from '@/components/lists/detail/ShoplistItem.tsx';
import classes from './Shoplist.module.scss';

interface Props {
  list: ShoplistWithItems;
}

const Shoplist: FC<Props> = ({ list }) => {
  // sort ticked items to bottom
  const sortedItems = list.items.toSorted((a) => (a.ticked ? 1 : -1));

  return (
    <div>
      <h1 className={classes.name}>{list.name}</h1>
      <div className={classes.list}>
        {sortedItems.map((i) => (
          <ShoplistItem
            item={i}
            key={i.id}
          />
        ))}
      </div>
    </div>
  );
};
export default Shoplist;
