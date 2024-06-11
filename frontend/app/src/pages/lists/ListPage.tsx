import { Link, useParams } from 'react-router-dom';
import { Button } from '@mantine/core';
import { IoArrowBack } from 'react-icons/io5';
import { useShoplistsApiGetList } from '@/data/shoplists-api.ts';
import EntityLoader from '@/components/common/EntityLoader.tsx';
import Shoplist from '@/components/lists/detail/Shoplist.tsx';
import classes from './ListPage.module.scss';
import ApiError from '@/components/common/ApiError.tsx';

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
