import { FC } from 'react';

interface Props {
  className: string;
}

const AppHeader: FC<Props> = ({ className }) => <div className={className}>header</div>;

export default AppHeader;
