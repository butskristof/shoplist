import { FC, ReactNode } from 'react';
import classes from './NotFound.module.scss';
import { capitalize } from '@/utilities/string.ts';

interface Props {
  entity: string;
  actions?: ReactNode;
}

const NotFound: FC<Props> = ({ entity, actions }) => (
  <div className={classes.notFound}>
    <h1>{capitalize(entity)} not found</h1>
    <p>Sorry, we couldn&apos;t find the {entity} you requested.</p>
    {actions && <div className={classes.actions}>{actions}</div>}
  </div>
);

export default NotFound;
