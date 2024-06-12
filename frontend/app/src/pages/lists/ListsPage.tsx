import { IconPlus } from '@tabler/icons-react';
import LeftRightHeader from '@/components/common/LeftRightHeader.tsx';
import ShoplistList from '@/components/lists/overview/ShoplistList.tsx';
import { useShoplistsApiGetLists } from '@/data/shoplists-api.ts';
import IconButton from '@/components/common/IconButton.tsx';
import EntityQuery from '@/components/common/EntityQuery.tsx';

const ListsPage = () => {
  const query = useShoplistsApiGetLists();

  return (
    <EntityQuery
      query={query}
      entity="lists"
    >
      <LeftRightHeader
        left={<h1>Lists</h1>}
        right={<IconButton icon={<IconPlus />}>Add new list</IconButton>}
      />

      <ShoplistList lists={query.data ?? []} />
    </EntityQuery>
  );
};

export default ListsPage;
