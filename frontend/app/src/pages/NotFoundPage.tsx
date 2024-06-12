import { Link } from 'react-router-dom';
import { IconHome } from '@tabler/icons-react';
import NotFound from '@/components/common/NotFound.tsx';
import IconButton from '@/components/common/IconButton.tsx';

const NotFoundPage = () => (
  <NotFound
    entity="page"
    actions={
      <IconButton
        component={Link}
        to="/"
        icon={<IconHome />}
      >
        Go to dashboard
      </IconButton>
    }
  />
);

export default NotFoundPage;
