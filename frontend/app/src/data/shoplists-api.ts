import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { ShoplistsApi } from '@/services/shoplists-api.ts';
import { ShoplistItem } from '@/types/shoplists-api.types.ts';

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

export const useShoplistsApiUpsertItem = (queryClient: QueryClient, isEdit: boolean) =>
  useMutation({
    mutationFn: (payload) =>
      isEdit ? ShoplistsApi.updateItem(payload) : ShoplistsApi.createItem(payload),
    onSuccess: (response: ShoplistItem) =>
      queryClient.invalidateQueries({
        queryKey: ['lists', response.listId],
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
