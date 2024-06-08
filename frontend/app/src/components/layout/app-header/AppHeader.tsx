import { FC } from 'react';
import classes from './AppHeader.module.scss';

interface Props {
  className: string;
}

const AppHeader: FC<Props> = ({ className }) => (
  <header className={`${className} ${classes.header}`}>
    <div className={classes.brand}>
      <div>Shoplist</div>
    </div>
    <div className="toggle"></div>
    <div className="content">
      <ul className="links">
        <li>
          <a href="#">Home</a>
        </li>
      </ul>
    </div>
  </header>
);

export default AppHeader;
