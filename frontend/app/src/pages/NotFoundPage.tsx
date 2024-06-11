import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import NotFound from '@/components/common/NotFound.tsx';

const NotFoundPage = () => (
  <NotFound
    entity="page"
    actions={
      <>
        <Button
          component={Link}
          to="/"
          leftSection={<IoHome />}
        >
          Go to dashboard
        </Button>
      </>
    }
  />
);

export default NotFoundPage;
