import { useQuery } from '@tanstack/react-query';
import { Bff } from '@/services/bff.ts';

export const useBffUser = () =>
  useQuery({
    queryKey: ['bff', 'user'],
    queryFn: Bff.getUser,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });

export const useBffDiagnostics = () =>
  useQuery({
    queryKey: ['bff', 'diagnostics'],
    queryFn: Bff.getDiagnostics,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
