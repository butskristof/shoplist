import { createAxiosInstance } from './base-api.ts';
import { GetListsResponse } from '@/types/shoplists-api/lists/GetLists.types.ts';
import { GetListResponse } from '@/types/shoplists-api/lists/GetList.types.ts';
import {
  CreateListRequest,
  CreateListResponse,
} from '@/types/shoplists-api/lists/CreateList.types.ts';
import { UpdateListRequest } from '@/types/shoplists-api/lists/UpdateList.types.ts';
import {
  CreateListItemRequest,
  CreateListItemResponse,
} from '@/types/shoplists-api/listitems/CreateListItem.types.ts';
import { UpdateListItemRequest } from '@/types/shoplists-api/listitems/UpdateListItem.types.ts';

const api = createAxiosInstance('/api');

export const ShoplistsApi = {
  //#region lists

  getLists: () => api.get<GetListsResponse>('/lists').then((r) => r.data),

  getList: (id: string) => api.get<GetListResponse>(`/lists/${id}`).then((r) => r.data),

  createList: (payload: CreateListRequest) =>
    api.post<CreateListResponse>('/lists', payload).then((r) => r.data),

  updateList: (id: string, payload: UpdateListRequest) =>
    api.put<null>(`/lists/${id}`, payload).then((r) => r.data),

  deleteList: (id: string): Promise<null> => api.delete<null>(`/lists/${id}`).then((r) => r.data),

  //#endregion

  //#region list items

  createItem: (listId: string, payload: CreateListItemRequest) =>
    api.post<CreateListItemResponse>(`lists/${listId}/items`, payload).then((r) => r.data),

  updateItem: (id: string, listId: string, payload: UpdateListItemRequest) =>
    api.put<null>(`lists/${listId}/items/${id}`, payload).then((r) => r.data),

  deleteItem: (id: string, listId: string) =>
    api.delete<null>(`/lists/${listId}/items/${id}`).then((r) => r.data),

  //#endregion
};
