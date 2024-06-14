import { useQuery } from '@tanstack/react-query';
import { Bff } from '@/services/bff.ts';

export const useBffUser = () =>
  useQuery({
    queryKey: ['bff', 'user'],
    queryFn: Bff.getUser,
    staleTime: Infinity,
    // cacheTime: Infinity,
    retry: false,
  });
