import { FC, ReactNode } from 'react';
import AppHeader from '../app-header/AppHeader.tsx';
import classes from './AppLayout.module.css';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => (
  <div className={classes.layout}>
    <AppHeader className={classes.header} />
    <div className={classes.body}>
      <div className={classes.page}>{children}</div>
      <div className={classes.footer}>footer</div>
    </div>
  </div>
);

export default AppLayout;
