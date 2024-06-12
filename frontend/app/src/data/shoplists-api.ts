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

export const useShoplistApiCreateItem = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: ShoplistsApi.createItem,
    onSuccess: (response: ShoplistItem) =>
      queryClient.invalidateQueries({
        queryKey: ['lists', response.listId],
      }),
  });

export const useShoplistsApiUpdateItem = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: ShoplistsApi.updateItem,
    onSuccess: (response: ShoplistItem) =>
      queryClient.invalidateQueries({
        queryKey: ['lists', response.listId],
      }),
  });
