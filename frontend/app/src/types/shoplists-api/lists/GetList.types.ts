export interface GetListResponse {
  id: string;
  name: string;
  items: ListItem[];
}

export interface ListItem {
  id: string;
  name: string;
  ticked: boolean;
}
