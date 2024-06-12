import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import LeftRightHeader from '@/components/common/LeftRightHeader.tsx';
import ShoplistList from '@/components/lists/overview/ShoplistList.tsx';
import { useShoplistsApiGetLists } from '@/data/shoplists-api.ts';
import IconButton from '@/components/common/IconButton.tsx';
import EntityQuery from '@/components/common/EntityQuery.tsx';
import EditShoplist from '@/components/lists/common/EditShoplist.tsx';

const ListsPage = () => {
  const query = useShoplistsApiGetLists();

  const [showCreate, setShowCreate] = useState(false);

  return (
    <EntityQuery
      query={query}
      entity="lists"
    >
      <LeftRightHeader
        left={<h1>Lists</h1>}
        right={
          <IconButton
            icon={<IconPlus />}
            onClick={() => setShowCreate(true)}
          >
            Add new list
          </IconButton>
        }
      />

      <ShoplistList lists={query.data ?? []} />

      {showCreate && <EditShoplist onClose={() => setShowCreate(false)} />}
    </EntityQuery>
  );
};

export default ListsPage;
