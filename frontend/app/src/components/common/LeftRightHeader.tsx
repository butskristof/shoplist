import { FC, ReactNode } from 'react';
import classes from './LeftRightHeader.module.scss';

interface Props {
  left?: ReactNode;
  right?: ReactNode;
}
const LeftRightHeader: FC<Props> = ({ left, right }) => (
  <div className={classes.header}>
    {left != null ? left : <div></div>}
    {right != null ? right : <div></div>}
  </div>
);

export default LeftRightHeader;
