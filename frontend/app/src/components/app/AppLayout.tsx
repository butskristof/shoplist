import { FC } from 'react';
import { PropsWithChildren } from '@/types/PropsWithChildren.ts';
import classes from './AppLayout.module.scss';
import AppFooter from '@/components/app/AppFooter.tsx';

const AppLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={classes.layout}>
    <div className={classes.header}>header</div>
    <div className={classes.body}>
      <div className={classes.page}>{children}</div>
      <AppFooter className={classes.footer} />
    </div>
  </div>
);

export default AppLayout;
