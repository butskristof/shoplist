import { createAxiosInstance } from '@/services/base-api.ts';
import { BffDiagnostics, Claim } from '@/types/bff.types.ts';

const bff = createAxiosInstance('/bff');

export const Bff = {
  getUser: () => bff.get<Claim[]>('/user').then((r) => r.data),
  getDiagnostics: () => bff.get<BffDiagnostics>('/diagnostics').then((r) => r.data),
};
