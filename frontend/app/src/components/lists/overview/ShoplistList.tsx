import { FC } from 'react';
import { Shoplist } from '@/types/shoplists-api.types.ts';
import ShoplistListItem from '@/components/lists/overview/ShoplistListItem.tsx';

interface Props {
  lists: Shoplist[];
  loading: boolean;
}
const ShoplistList: FC<Props> = ({ lists, loading }) => {
  if (loading) return <div>Fetching lists...</div>;

  if (lists.length > 0)
    return (
      <ul>
        {lists.map((list) => (
          <ShoplistListItem
            list={list}
            key={list.id}
          />
        ))}
      </ul>
    );

  return <div>No lists found, get started by adding a new one.</div>;
};

export default ShoplistList;
