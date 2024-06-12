import { FC } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ShoplistWithItems } from '@/types/shoplists-api.types.ts';
import classes from './Shoplist.module.scss';
import LeftRightHeader from '@/components/common/LeftRightHeader.tsx';
import IconButton from '@/components/common/IconButton.tsx';
import ShoplistItems from '@/components/lists/detail/ShoplistItems.tsx';

interface Props {
  list: ShoplistWithItems;
}

const Shoplist: FC<Props> = ({ list }) => {
  const untickedCount = list.items.filter((i) => !i.ticked).length;

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
          <div className={classes.headerActions}>
            <IconButton icon={<IconEdit />}>Edit</IconButton>
            <IconButton icon={<IconTrash />}>Delete</IconButton>
          </div>
        }
      />

      <ShoplistItems list={list} />
    </>
  );
};

export default Shoplist;
