import { FC } from 'react';
import { Link } from 'react-router-dom';
import classes from './ShoplistListItem.module.scss';
import { List } from '@/types/shoplists-api/lists/GetLists.types.ts';

interface Props {
  list: List;
}

const ShoplistListItem: FC<Props> = ({ list }) => (
  // const unticked = Math.round(Math.random() * 10); // TODO replace w/ API data

  <Link to={`/lists/${list.id}`}>
    <div className={classes.item}>
      <div className={classes.name}>{list.name}</div>
      <div className={classes.unticked}>{list.itemsCount} items</div>
    </div>
  </Link>
);
export default ShoplistListItem;
