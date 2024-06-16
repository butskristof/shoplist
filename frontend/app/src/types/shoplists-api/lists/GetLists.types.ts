export interface GetListsResponse {
  lists: List[];
}

export interface List {
  id: string;
  name: string;
  itemsCount: number;
}
