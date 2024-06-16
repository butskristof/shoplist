export interface GetListsResponse {
  lists: GetListsResponseList[];
}

export interface GetListsResponseList {
  id: string;
  name: string;
  itemsCount: number;
}
