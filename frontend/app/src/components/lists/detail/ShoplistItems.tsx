import { FC, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import {
  ShoplistWithItems,
  ShoplistItem as ShoplistItemType,
} from '@/types/shoplists-api.types.ts';
import classes from './ShoplistItems.module.scss';
import ShoplistItem from '@/components/lists/detail/ShoplistItem.tsx';
import LeftRightHeader from '@/components/common/LeftRightHeader.tsx';
import IconButton from '@/components/common/IconButton.tsx';
import EditShoplistItem from '@/components/lists/detail/EditShoplistItem.tsx';
import DeleteShoplistItem from '@/components/lists/detail/DeleteShoplistItem.tsx';

interface Props {
  list: ShoplistWithItems;
}

const ShoplistItems: FC<Props> = ({ list }) => {
  // sort ticked items to bottom
  const sortedItems = list.items.toSorted((a) => (a.ticked ? 1 : -1));

  //#region create/edit item

  const [showEdit, setShowEdit] = useState(false);
  const [itemForEdit, setItemForEdit] = useState<ShoplistItemType | undefined>(undefined);
  const openEdit = (id: string | undefined = undefined) => {
    setItemForEdit(list.items.find((i) => i.id === id));
    setShowEdit(true);
  };
  const closeEdit = () => {
    setShowEdit(false);
    setItemForEdit(undefined);
  };

  //#endregion

  //#region delete item

  const [itemForDelete, setItemForDelete] = useState<ShoplistItemType | undefined>(undefined);
  const openDelete = (id: string) => setItemForDelete(list.items.find((i) => i.id === id));
  const closeDelete = () => setItemForDelete(undefined);

  //#endregion

  return (
    <>
      <LeftRightHeader
        left={<h2>Items</h2>}
        right={
          <IconButton
            icon={<IconPlus />}
            onClick={() => openEdit()}
          >
            Add new list item
          </IconButton>
        }
      />

      <div className={classes.list}>
        {sortedItems.map((i) => (
          <ShoplistItem
            item={i}
            key={i.id}
            onEdit={() => openEdit(i.id)}
            onDelete={() => openDelete(i.id)}
          />
        ))}
      </div>

      {showEdit && (
        <EditShoplistItem
          listId={list.id}
          onClose={closeEdit}
          shoplistItem={itemForEdit}
        />
      )}

      {itemForDelete && (
        <DeleteShoplistItem
          onClose={closeDelete}
          item={itemForDelete}
        />
      )}
    </>
  );
};

export default ShoplistItems;
