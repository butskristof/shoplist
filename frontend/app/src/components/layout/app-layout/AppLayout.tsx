import { FC, ReactNode } from 'react';
import AppHeader from '../app-header/AppHeader.tsx';
import classes from './AppLayout.module.scss';
import AppFooter from '../app-footer/AppFooter.tsx';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => (
  <div className={classes.layout}>
    <AppHeader className={classes.header} />
    <div className={classes.body}>
      <div className={classes.page}>{children}</div>
      <AppFooter className={classes.footer} />
    </div>
  </div>
);

export default AppLayout;
