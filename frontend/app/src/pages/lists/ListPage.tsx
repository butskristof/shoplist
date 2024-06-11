import { Link, useParams } from 'react-router-dom';
import { Button } from '@mantine/core';
import { IoArrowBack, IoHome } from 'react-icons/io5';
import { useShoplistsApiGetList } from '@/data/shoplists-api.ts';
import NotFound from '@/components/common/NotFound.tsx';
import EntityLoader from '@/components/common/EntityLoader.tsx';
import Shoplist from '@/components/lists/detail/Shoplist.tsx';
import classes from './ListPage.module.scss';

const ListPage = () => {
  // we assume id will be available, otherwise the router
  // won't let the component be rendered
  const { id } = useParams() as { id: string };
  const query = useShoplistsApiGetList(id);

  return (
    <>
      <div className={classes.header}>
        <Button
          component={Link}
          to="/lists"
          leftSection={<IoArrowBack />}
          variant="light"
        >
          Back to overview
        </Button>
      </div>
      {query.isPending && <EntityLoader entity="list" />}
      {query.isError && query.error.response.status === 404 && (
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
      )}
      {query.isSuccess && <Shoplist list={query.data} />}
    </>
  );
};
export default ListPage;
