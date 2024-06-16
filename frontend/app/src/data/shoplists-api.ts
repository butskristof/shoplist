import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { ShoplistsApi } from '@/services/shoplists-api.ts';
import { CreateListRequest } from '@/types/shoplists-api/lists/CreateList.types.ts';
import { UpdateListRequest } from '@/types/shoplists-api/lists/UpdateList.types.ts';
import {
  CreateListItemRequest,
  CreateListItemResponse,
} from '@/types/shoplists-api/listitems/CreateListItem.types.ts';
import { UpdateListItemRequest } from '@/types/shoplists-api/listitems/UpdateListItem.types.ts';

//#region lists

export const useShoplistsApiGetLists = () =>
  useQuery({
    queryKey: ['lists'],
    queryFn: ShoplistsApi.getLists,
  });

export const useShoplistsApiGetList = (id: string) =>
  useQuery({
    queryKey: ['lists', id],
    queryFn: () => ShoplistsApi.getList(id),
  });

export const useShoplistsApiUpsertList = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: ({
      payload,
      id,
    }: {
      payload: CreateListRequest | UpdateListRequest;
      id?: string;
    }) => (id ? ShoplistsApi.updateList(id, payload) : ShoplistsApi.createList(payload)),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['lists'], // TODO review
      }),
  });

export const useShoplistsApiDeleteList = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: string) => ShoplistsApi.deleteList(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['lists'], // TODO review
      }),
  });

//#endregion

//#region list items

export const useShoplistsApiUpsertItem = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: CreateListItemRequest | UpdateListItemRequest) =>
      'id' in payload ? ShoplistsApi.updateItem(payload) : ShoplistsApi.createItem(payload),
    onSuccess: (
      _response: CreateListItemResponse | null,
      request: CreateListItemRequest | UpdateListItemRequest,
    ) =>
      queryClient.invalidateQueries({
        queryKey: ['lists', request.listId],
      }),
  });

export const useShoplistsApiDeleteItem = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (id: string) => ShoplistsApi.deleteItem(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['lists'], // TODO review
      }),
  });

//#endregion
