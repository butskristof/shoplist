export interface CreateListItemRequest {
  name: string;
}

export interface CreateListItemResponse {
  id: string;
  name: string;
  ticked: boolean;
  listId: string;
}
