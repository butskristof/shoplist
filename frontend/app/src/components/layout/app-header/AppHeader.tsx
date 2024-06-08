import { FC } from 'react';
import { LuShoppingCart } from 'react-icons/lu';
import classes from './AppHeader.module.scss';

interface Props {
  className: string;
}

const AppHeader: FC<Props> = ({ className }) => (
  <header className={`${className} ${classes.header}`}>
    <div className={classes.brand}>
      <LuShoppingCart size={36} />
      <div>Shoplist</div>
    </div>
  </header>
);

export default AppHeader;
