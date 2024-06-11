import { FC } from 'react';
import { Shoplist } from '@/types/shoplists-api.types.ts';

interface Props {
  list: Shoplist;
}

const ShoplistListItem: FC<Props> = ({ list }) => <li>{list.name}</li>;

export default ShoplistListItem;
