import { FC } from 'react';
import { PropsWithChildren } from '@/types/PropsWithChildren.ts';
import classes from './AppLayout.module.scss';

const AppLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={classes.layout}>
    <div className={classes.header}>header</div>
    <div className={classes.body}>
      <div className={classes.page}>{children}</div>
      <div className={classes.footer}>
        <div className={classes.actions}>
          <div>action</div>
          <div>action</div>
          <div>action</div>
        </div>
      </div>
    </div>
  </div>
);

export default AppLayout;
