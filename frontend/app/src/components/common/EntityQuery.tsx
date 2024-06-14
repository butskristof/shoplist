import { FC } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { PropsWithChildren } from '@/types/PropsWithChildren.ts';
import AppLoader from '@/components/common/AppLoader.tsx';
import ApiError from '@/components/common/ApiError.tsx';

// this component can be used to quickly show loading, error and success states
// when loading entities
// on success, the passed in children will be rendered

interface Props extends PropsWithChildren {
  query: UseQueryResult;
  entity: string;
}

const EntityQuery: FC<Props> = ({ query, entity, children }) => {
  if (query.isPending) return <AppLoader entity={entity} />;
  if (query.isError)
    return (
      <ApiError
        error={query.error}
        entity={entity}
        page
      />
    );
  if (query.isSuccess) return children;
  return null;
};

export default EntityQuery;
