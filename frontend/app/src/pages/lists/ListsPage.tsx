import { Button } from '@mantine/core';
import { IoAdd } from 'react-icons/io5';
import LeftRightHeader from '@/components/common/LeftRightHeader.tsx';
import classes from './ListsPage.module.scss';
import ShoplistList from '@/components/lists/overview/ShoplistList.tsx';
import { useShoplistsApiGetLists } from '@/data/shoplists-api.ts';

const ListsPage = () => {
  const query = useShoplistsApiGetLists();
  return (
    <div>
      <LeftRightHeader
        left={<h1>Lists</h1>}
        right={
          <div className={classes['header-actions']}>
            <Button leftSection={<IoAdd size={20} />}>Add new list</Button>
          </div>
        }
      />
      <ShoplistList
        lists={query.data ?? []}
        loading={query.isPending}
      />
    </div>
  );
};
export default ListsPage;
