import { Outlet } from 'react-router-dom';
import classes from './AppLayout.module.scss';
import AppFooter from '@/components/app/AppFooter.tsx';
import AppHeader from '@/components/app/AppHeader.tsx';

const AppLayout = () => (
  <div className={classes.layout}>
    <AppHeader className={classes.header} />
    <div className={classes.body}>
      <div className={classes.page}>
        <Outlet />
      </div>
      <AppFooter className={classes.footer} />
    </div>
  </div>
);

export default AppLayout;
