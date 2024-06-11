import { Loader } from '@mantine/core';
import { FC } from 'react';
import classes from './EntityLoader.module.scss';

interface Props {
  entity: string;
}

const EntityLoader: FC<Props> = ({ entity }) => (
  <div className={classes.loader}>
    <Loader size="xl" />
    <div>Loading {entity}</div>
  </div>
);

export default EntityLoader;
