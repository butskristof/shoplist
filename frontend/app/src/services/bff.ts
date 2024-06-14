import { createAxiosInstance } from '@/services/base-api.ts';
import { BffUser } from '@/types/bff.types.ts';

const bff = createAxiosInstance('/bff');

export const Bff = {
  getUser: () => bff.get<BffUser>('/user').then((r) => r.data),
  // getDiagnostics: () => bff.get('/diagnostics').then((r) => r.data),
};
