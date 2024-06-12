import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { Shoplist } from '@/types/shoplists-api.types.ts';
import classes from './ShoplistListItem.module.scss';

interface Props {
  list: Shoplist;
}

const ShoplistListItem: FC<Props> = ({ list }) => {
  const unticked = Math.round(Math.random() * 10); // TODO replace w/ API data

  return (
    <Button
      component={Link}
      to={`/lists/${list.id}`}
      variant="light"
      size="md"
      classNames={{
        root: classes['list-item'],
        label: classes['list-item-label'],
      }}
    >
      <div className="name">{list.name}</div>
      <div className={classes.unticked}>{unticked} unticked items</div>
    </Button>
  );
};

export default ShoplistListItem;
