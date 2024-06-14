import { useBffUser } from '@/data/bff.ts';

export const useAuth = () => {
  const query = useBffUser();
  const name = query.data?.find((c) => c.type === 'name');
  const sub = query.data?.find((c) => c.type === 'sub');

  return {
    query,
    isLoading: query.isPending,
    isAuthenticated: query.isSuccess,
    claims: query.data,
    name,
    sub,
  };
};
