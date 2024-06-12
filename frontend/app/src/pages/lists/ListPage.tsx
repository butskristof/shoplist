import { useParams } from 'react-router-dom';
import { useShoplistsApiGetList } from '@/data/shoplists-api.ts';
import Shoplist from '@/components/lists/detail/Shoplist.tsx';
import DetailPageHeader from '@/components/common/DetailPageHeader.tsx';
import EntityQuery from '@/components/common/EntityQuery.tsx';

const ListPage = () => {
  // we assume id will be available, otherwise the router
  // won't let the component be rendered
  const { id } = useParams() as { id: string };
  const query = useShoplistsApiGetList(id);

  return (
    <>
      <DetailPageHeader backTo="/lists" />

      <EntityQuery
        query={query}
        entity="list"
      >
        {/* query.data will be defined if the children are rendered (only when isSuccess) */}
        <Shoplist list={query.data!} />
      </EntityQuery>
    </>
  );
};

export default ListPage;
