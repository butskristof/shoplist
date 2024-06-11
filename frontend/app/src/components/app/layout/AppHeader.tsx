import { FC } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { PropsWithClassName } from '@/types/PropsWithClassName.ts';
import classes from './AppHeader.module.scss';

const AppHeader: FC<PropsWithClassName> = ({ className }) => {
  const headerClassName = clsx(className, classes.header);
  return (
    <header className={headerClassName}>
      <Link
        to="/"
        className={classes.brand}
      >
        <IoCartOutline size={36} />
        <div>Shoplist</div>
      </Link>
    </header>
  );
};

export default AppHeader;
