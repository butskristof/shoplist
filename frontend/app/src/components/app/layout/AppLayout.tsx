import classes from './AppLayout.module.scss';
import AppFooter from '@/components/app/layout/AppFooter.tsx';
import AppHeader from '@/components/app/layout/AppHeader.tsx';
import AppMain from '@/components/app/layout/AppMain.tsx';

const AppLayout = () => (
  <div className={classes.layout}>
    <AppHeader className={classes.header} />
    <div className={classes.body}>
      <AppMain className={classes.page} />
      <AppFooter className={classes.footer} />
    </div>
  </div>
);

export default AppLayout;
