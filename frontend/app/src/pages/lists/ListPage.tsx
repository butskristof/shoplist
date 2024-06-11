import { Link, useParams } from 'react-router-dom';
import { Button } from '@mantine/core';
import { IoHome } from 'react-icons/io5';
import { useShoplistsApiGetList } from '@/data/shoplists-api.ts';
import NotFound from '@/components/common/NotFound.tsx';
import EntityLoader from '@/components/common/EntityLoader.tsx';
import Shoplist from '@/components/lists/detail/Shoplist.tsx';

const ListPage = () => {
  // we assume id will be available, otherwise the router
  // won't let the component be rendered
  const { id } = useParams() as { id: string };
  const query = useShoplistsApiGetList(id);

  if (query.isPending) return <EntityLoader entity="list" />;

  if (query.isError && query.error.response.status === 404)
    return (
      <NotFound
        entity="list"
        actions={
          <>
            <Button
              component={Link}
              to="/lists"
              leftSection={<IoHome />}
            >
              Back to list overview
            </Button>
          </>
        }
      />
    );

  return <Shoplist list={query.data} />;
};
export default ListPage;
