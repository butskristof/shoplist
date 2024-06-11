import { FC } from 'react';
import { Shoplist } from '@/types/shoplists-api.types.ts';
import ShoplistListItem from '@/components/lists/overview/ShoplistListItem.tsx';
import classes from './ShoplistList.module.scss';

interface Props {
  lists: Shoplist[];
  loading: boolean;
}

const ShoplistList: FC<Props> = ({ lists, loading }) => {
  if (loading) return <div>Fetching lists...</div>;

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
