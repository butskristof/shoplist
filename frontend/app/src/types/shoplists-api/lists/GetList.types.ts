export interface GetListResponse {
  id: string;
  name: string;
  items: GetListResponseListItem[];
}

export interface GetListResponseListItem {
  id: string;
  name: string;
  ticked: boolean;
}
