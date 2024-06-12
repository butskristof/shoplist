import { FC, ReactNode } from 'react';
import { capitalize } from '@/utilities/string.ts';

interface Props {
  entity?: string;
  actions?: ReactNode;
}

const NotFound: FC<Props> = ({ entity = 'Entity', actions }) => (
  <div className="full-page-info">
    <h1>{capitalize(entity)} not found</h1>
    <p>Sorry, we couldn&apos;t find the {entity} you requested.</p>
    {actions && <div className="actions">{actions}</div>}
  </div>
);

export default NotFound;
