import { Link, To } from 'react-router-dom';
import { Button } from '@mantine/core';
import { IoArrowBack } from 'react-icons/io5';
import { FC } from 'react';
import classes from './DetailPageHeader.module.scss';

interface Props {
  backTo: To;
}
const DetailPageHeader: FC<Props> = ({ backTo }) => (
  <div className={classes.header}>
    <Button
      component={Link}
      to={backTo}
      leftSection={<IoArrowBack />}
      variant="light"
    >
      Back to overview
    </Button>
  </div>
);

export default DetailPageHeader;
