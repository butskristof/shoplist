import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { Shoplist } from '@/types/shoplists-api.types.ts';
import classes from './ShoplistListItem.module.scss';

interface Props {
  list: Shoplist;
}

const ShoplistListItem: FC<Props> = ({ list }) => {
  const unticked = Math.round(Math.random() * 10);
  return (
    <>
      <Button
        component={Link}
        to={`/lists/${list.id}`}
        variant="white"
        size="md"
        classNames={{
          label: classes['list-item-label'],
        }}
      >
        <div className="name">{list.name}</div>
        <div className={classes.unticked}>{unticked} items unticked</div>
      </Button>
    </>
  );
};

export default ShoplistListItem;
