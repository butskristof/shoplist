export interface Shoplist {
  id: string;
  name: string;
}

export interface ShoplistWithItems {
  id: string;
  name: string;
  items: ShoplistItem[];
}

export interface ShoplistItem {
  id: string;
  name: string;
  ticked: boolean;
  listId: string;
}
