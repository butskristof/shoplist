import { createAxiosInstance } from './base-api.ts';
import { Shoplist, ShoplistItem, ShoplistWithItems } from '@/types/shoplists-api.types.ts';

const api = createAxiosInstance('/api');

export const ShoplistsApi = {
  getLists: (): Promise<Shoplist[]> => api.get<Shoplist[]>('/lists').then((r) => r.data),

  getList: (id: string): Promise<ShoplistWithItems> =>
    api.get<ShoplistWithItems>(`/lists/${id}?_embed=items`).then((r) => r.data),

  createList: (payload: Shoplist): Promise<Shoplist> =>
    api.post<Shoplist>('/lists', payload).then((r) => r.data),

  updateList: (payload: Shoplist): Promise<Shoplist> =>
    api.put<Shoplist>(`/lists/${payload.id}`, payload).then((r) => r.data),

  deleteList: (id: string): Promise<null> => api.delete<null>(`/lists/${id}`).then((r) => r.data),

  createItem: (payload: ShoplistItem): Promise<ShoplistItem> =>
    api.post<ShoplistItem>('items', payload).then((r) => r.data),

  updateItem: (payload: ShoplistItem): Promise<ShoplistItem> =>
    api.put<ShoplistItem>(`items/${payload.id}`, payload).then((r) => r.data),

  deleteItem: (id: string): Promise<null> => api.delete<null>(`/items/${id}`).then((r) => r.data),
};
