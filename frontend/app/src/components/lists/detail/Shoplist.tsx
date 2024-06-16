import { FC, useState } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import LeftRightHeader from '@/components/common/LeftRightHeader.tsx';
import IconButton from '@/components/common/IconButton.tsx';
import ShoplistItems from '@/components/lists/detail/ShoplistItems.tsx';
import DeleteShoplist from '@/components/lists/detail/DeleteShoplist.tsx';
import EditShoplist from '@/components/lists/common/EditShoplist.tsx';
import { GetListResponse } from '@/types/shoplists-api/lists/GetList.types.ts';

interface Props {
  list: GetListResponse;
}

const Shoplist: FC<Props> = ({ list }) => {
  const navigate = useNavigate();
  const untickedCount = list.items.filter((i) => !i.ticked).length;

  //#region edit

  const [showEdit, setShowEdit] = useState(false);

  //#endregion

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
            <IconButton
              icon={<IconEdit />}
              onClick={() => setShowEdit(true)}
            >
              Edit
            </IconButton>
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

      {showEdit && (
        <EditShoplist
          onClose={() => setShowEdit(false)}
          shoplist={list}
        />
      )}

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
