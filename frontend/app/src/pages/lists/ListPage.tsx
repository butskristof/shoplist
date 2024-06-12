import { useParams } from 'react-router-dom';
import { useShoplistsApiGetList } from '@/data/shoplists-api.ts';
import EntityLoader from '@/components/common/EntityLoader.tsx';
import Shoplist from '@/components/lists/detail/Shoplist.tsx';
import ApiError from '@/components/common/ApiError.tsx';
import DetailPageHeader from '@/components/common/DetailPageHeader.tsx';

const ListPage = () => {
  // we assume id will be available, otherwise the router
  // won't let the component be rendered
  const { id } = useParams() as { id: string };
  const query = useShoplistsApiGetList(id);

  return (
    <>
      <DetailPageHeader to="/lists" />

      {query.isPending && <EntityLoader entity="list" />}

      {query.isError && (
        <ApiError
          error={query.error}
          entity="list"
          page
        />
      )}

      {query.isSuccess && <Shoplist list={query.data} />}
    </>
  );
};
export default ListPage;
