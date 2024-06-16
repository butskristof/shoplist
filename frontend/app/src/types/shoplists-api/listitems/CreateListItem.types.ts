export interface CreateListItemRequest {
  name: string;
  listId: string;
}

export interface CreateListItemResponse {
  id: string;
  name: string;
  ticked: boolean;
  listId: string;
}
