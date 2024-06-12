import { FC, useState } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ShoplistWithItems } from '@/types/shoplists-api.types.ts';
import LeftRightHeader from '@/components/common/LeftRightHeader.tsx';
import IconButton from '@/components/common/IconButton.tsx';
import ShoplistItems from '@/components/lists/detail/ShoplistItems.tsx';
import DeleteShoplist from '@/components/lists/detail/DeleteShoplist.tsx';

interface Props {
  list: ShoplistWithItems;
}

const Shoplist: FC<Props> = ({ list }) => {
  const navigate = useNavigate();
  const untickedCount = list.items.filter((i) => !i.ticked).length;

  //#region delete

  const [showDelete, setShowDelete] = useState(false);
  const closeDelete = (deleted: boolean) => {
    setShowDelete(false);
    if (deleted) navigate('/lists');
  };

  //#endregion

  return (
    <>
      <LeftRightHeader
        left={
          <>
            <h1>{list.name}</h1>
            <p>
              {untickedCount} unticked item{untickedCount !== 1 && 's'}
            </p>
          </>
        }
        right={
          <>
            <IconButton icon={<IconEdit />}>Edit</IconButton>
            <IconButton
              icon={<IconTrash />}
              color="red"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </IconButton>
          </>
        }
      />

      <ShoplistItems list={list} />

      {showDelete && (
        <DeleteShoplist
          onClose={closeDelete}
          list={list}
        />
      )}
    </>
  );
};

export default Shoplist;
