import { FC } from 'react';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { PropsWithClassName } from '@/types/PropsWithClassName.ts';
import UnauthenticatedView from '@/components/app/layout/UnauthenticatedView.tsx';
import AppLoader from '@/components/common/AppLoader.tsx';
import { useAuth } from '@/utilities/auth.ts';

interface Props extends PropsWithClassName {}

const AppMain: FC<Props> = ({ className }) => {
  const mainClassNames = clsx(className);

  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) {
    return (
      <div className={mainClassNames}>
        <AppLoader message="Logging in..." />
      </div>
    );
  }

  return (
    <div className={mainClassNames}>{isAuthenticated ? <Outlet /> : <UnauthenticatedView />}</div>
  );
};

export default AppMain;
