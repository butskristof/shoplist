import { FC } from 'react';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { PropsWithClassName } from '@/types/PropsWithClassName.ts';
import { useBffUser } from '@/data/bff.ts';
import UnauthenticatedView from '@/components/app/layout/UnauthenticatedView.tsx';

interface Props extends PropsWithClassName {}

const AppMain: FC<Props> = ({ className }) => {
  const bffUserQuery = useBffUser();
  // const isLoading = bffUserQuery.isPending;
  const isAuthenticated = bffUserQuery.isSuccess;

  const mainClassNames = clsx(className);
  return (
    <div className={mainClassNames}>{isAuthenticated ? <Outlet /> : <UnauthenticatedView />}</div>
  );
};

export default AppMain;
