import { FC } from 'react';
import classes from './AppFooter.module.scss';

interface Props {
  className: string;
}

const AppFooter: FC<Props> = ({ className }) => (
  <footer className={`${className} ${classes.footer}`}>footer</footer>
);

export default AppFooter;
