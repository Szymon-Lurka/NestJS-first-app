import { ShopItem } from 'src/shop/shop-item.entity';
export interface ListData {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type GetListOfProducts = ListData[];

export type GetOneProductRespone = ShopItem;

export type CreateProductResponse = ShopItem;

export interface GetPaginatedListOfProductsResponse {
  items: ShopItem[];
  pagesCount: number;
}
