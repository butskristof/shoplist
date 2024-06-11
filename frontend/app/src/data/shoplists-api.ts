import { useQuery } from '@tanstack/react-query';
import { ShoplistsApi } from '@/services/shoplists-api.ts';

export const useShoplistsApiGetLists = () =>
  useQuery({
    queryKey: ['lists'],
    queryFn: ShoplistsApi.getLists,
  });

export const useShoplistsApiGetList = (id: string) =>
  useQuery({
    queryKey: ['lists', id],
    queryFn: () => ShoplistsApi.getList(id),
    // retry: false, // TODO conditional for 404?
  });
