import { createAxiosInstance } from './base-api.ts';
import { Shoplist } from '@/types/shoplists-api.types.ts';

const api = createAxiosInstance('/api');

export const ShoplistsApi = {
  getLists: () => api.get<Shoplist[]>('/lists').then((r) => r.data),
  getList: (id: string) => api.get(`/lists/${id}`).then((r) => r.data),
};
