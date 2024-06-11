import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import classes from './LeftRightHeader.module.scss';
import { PropsWithClassName } from '@/types/PropsWithClassName.ts';

interface Props extends PropsWithClassName {
  left?: ReactNode;
  right?: ReactNode;
}
const LeftRightHeader: FC<Props> = ({ left, right, className }) => {
  const headerClassNames = clsx(classes.header, className);

  return (
    <div className={headerClassNames}>
      {left != null ? left : <div className={classes.left}></div>}
      {right != null ? right : <div className={classes.right}></div>}
    </div>
  );
};

export default LeftRightHeader;
