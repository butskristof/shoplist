import { FC } from 'react';
import { Button } from '@mantine/core';
import { IoAdd } from 'react-icons/io5';
import { useDisclosure } from '@mantine/hooks';
import { ShoplistWithItems } from '@/types/shoplists-api.types.ts';
import ShoplistItem from '@/components/lists/detail/ShoplistItem.tsx';
import classes from './Shoplist.module.scss';
import LeftRightHeader from '@/components/common/LeftRightHeader.tsx';
import CreateShoplistItem from '@/components/lists/detail/CreateShoplistItem.tsx';

interface Props {
  list: ShoplistWithItems;
}

const Shoplist: FC<Props> = ({ list }) => {
  // sort ticked items to bottom
  const sortedItems = list.items.toSorted((a) => (a.ticked ? 1 : -1));
  const untickedCount = list.items.filter((i) => !i.ticked).length;

  const [showCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);

  return (
    <div className={classes.shoplist}>
      <LeftRightHeader
        className={classes.header}
        left={
          <div className={classes.headerLeft}>
            <h1 className={classes.name}>{list.name}</h1>
            <p>
              {untickedCount} unticked item{untickedCount !== 1 && 's'}
            </p>
          </div>
        }
        right={
          <div>
            <Button
              leftSection={<IoAdd size={20} />}
              onClick={openCreate}
            >
              Add item
            </Button>
          </div>
        }
      />
      {showCreate && (
        <CreateShoplistItem
          listId={list.id}
          onClose={closeCreate}
        />
      )}
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
