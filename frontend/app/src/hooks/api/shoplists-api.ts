import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:3000';
const fetchBase = (url: string) => fetch(BASE_URL + url).then((r) => r.json());

export const SHOPLISTS_API_QUERY_KEYS = {
  LISTS: {
    GET: ['lists', 'overview'],
    GET_BY_ID: (id: string) => ['lists', 'detail', id],
  },
};

//#region lists

export const useShoplistsApiLists = () =>
  useQuery({
    queryKey: SHOPLISTS_API_QUERY_KEYS.LISTS.GET,
    queryFn: () => fetchBase(`/lists`),
  });

export const useShoplistsApiList = (id: string) =>
  useQuery({
    queryKey: SHOPLISTS_API_QUERY_KEYS.LISTS.GET_BY_ID(id),
    queryFn: () => fetchBase(`/lists/${id}?_embed=items`),
  });

//#endregion
