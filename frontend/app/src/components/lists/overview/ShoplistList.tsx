import { FC } from 'react';
import ShoplistListItem from '@/components/lists/overview/ShoplistListItem.tsx';
import classes from './ShoplistList.module.scss';

export interface List {
  id: string;
  name: string;
  itemsCount: number;
}

interface Props {
  lists: List[];
}

const ShoplistList: FC<Props> = ({ lists }) => {
  if (lists.length > 0)
    return (
      <div className={classes.lists}>
        {lists.map((list) => (
          <ShoplistListItem
            list={list}
            key={list.id}
          />
        ))}
      </div>
    );

  return <div>No lists found, get started by adding a new one.</div>;
};

export default ShoplistList;
