import { Loader } from '@mantine/core';
import { FC } from 'react';
import classes from './AppLoader.module.scss';

interface Props {
  entity?: string;
  message?: string;
}

const AppLoader: FC<Props> = ({ entity, message }) => (
  <div className={classes.loader}>
    <Loader size="xl" />
    {message && <div>{message}</div>}
    {entity && <div>Loading {entity}</div>}
  </div>
);

export default AppLoader;
