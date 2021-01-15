import { basketItemDto } from '../basket/dto/basketItem.dto';

export interface AddProductToBasketResponse {
  isSuccess: boolean;
  id?: string;
}

export interface RemoveProductFromBasket {
  isSuccess: boolean;
}

interface OneItemInBasket {
  id:string;
  count: number;
}

export type ListProductsInBasketResponse = OneItemInBasket[];

export type GetTotalPriceResponse = number;

export interface GetBasketStatsResponse {
  itemInBasketAvgPrice: number;
  basketAvgTotalPrice: number;
}
