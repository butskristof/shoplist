import { Button } from '@mantine/core';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import classes from './NotFoundPage.module.scss';

const NotFoundPage = () => (
  <div className={classes['page-not-found']}>
    <h1>Page not found</h1>
    <p>Sorry, we couldn&apos;t find the page you requested.</p>
    <div className={classes.actions}>
      <Button
        component={Link}
        to="/"
        leftSection={<IoHome />}
      >
        Go to dashboard
      </Button>
    </div>
  </div>
);

export default NotFoundPage;
