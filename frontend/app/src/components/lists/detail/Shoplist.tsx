import { FC } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { ShoplistWithItems } from '@/types/shoplists-api.types.ts';
import ShoplistItem from '@/components/lists/detail/ShoplistItem.tsx';
import classes from './Shoplist.module.scss';
import LeftRightHeader from '@/components/common/LeftRightHeader.tsx';
import CreateShoplistItem from '@/components/lists/detail/CreateShoplistItem.tsx';
import IconButton from '@/components/common/IconButton.tsx';

interface Props {
  list: ShoplistWithItems;
}

const Shoplist: FC<Props> = ({ list }) => {
  // sort ticked items to bottom
  const sortedItems = list.items.toSorted((a) => (a.ticked ? 1 : -1));
  const untickedCount = list.items.filter((i) => !i.ticked).length;

  //#region create/edit

  const [showCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);

  //#endregion

  //#region delete
  //#endregion

  return (
    <>
      <LeftRightHeader
        left={
          <div>
            <h1>{list.name}</h1>
            <p>
              {untickedCount} unticked item{untickedCount !== 1 && 's'}
            </p>
          </div>
        }
        right={
          <div>
            <IconButton
              icon={<IconPlus />}
              onClick={openCreate}
            >
              Add list item
            </IconButton>
          </div>
        }
      />

      <div className={classes.list}>
        {sortedItems.map((i) => (
          <ShoplistItem
            item={i}
            key={i.id}
          />
        ))}
      </div>

      {showCreate && (
        <CreateShoplistItem
          listId={list.id}
          onClose={closeCreate}
        />
      )}
    </>
  );
};

export default Shoplist;
