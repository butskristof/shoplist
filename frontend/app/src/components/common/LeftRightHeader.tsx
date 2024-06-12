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
      <div className={classes.left}>{left}</div>
      <div className={classes.right}>{right}</div>
    </div>
  );
};

export default LeftRightHeader;
