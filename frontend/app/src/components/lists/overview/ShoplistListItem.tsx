import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Shoplist } from '@/types/shoplists-api.types.ts';
import classes from './ShoplistListItem.module.scss';

interface Props {
  list: Shoplist;
}

const ShoplistListItem: FC<Props> = ({ list }) => {
  const unticked = Math.round(Math.random() * 10); // TODO replace w/ API data

  return (
    <Link to={`/lists/${list.id}`}>
      <div className={classes.item}>
        <div className={classes.name}>{list.name}</div>
        <div className={classes.unticked}>{unticked} unticked items</div>
      </div>
    </Link>
  );
};

export default ShoplistListItem;
