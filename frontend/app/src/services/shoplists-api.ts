import { createAxiosInstance } from './base-api.ts';
import { Shoplist, ShoplistItem, ShoplistWithItems } from '@/types/shoplists-api.types.ts';

const api = createAxiosInstance('/api');

export const ShoplistsApi = {
  getLists: () => api.get<Shoplist[]>('/lists').then((r) => r.data),
  getList: (id: string) =>
    api.get<ShoplistWithItems>(`/lists/${id}?_embed=items`).then((r) => r.data),
  updateItem: (payload: ShoplistItem) =>
    api.put<ShoplistItem>(`items/${payload.id}`, payload).then((r) => r.data),
};
