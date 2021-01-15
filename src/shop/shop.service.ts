import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}
  async getItemList(): Promise<ShopItem[]> {
    return ShopItem.find();
  }
  async didItemExist(name): Promise<boolean> {
    return (await this.getItemList()).some((item) => item.name === name);
  }
  async getItemPrice(name: string): Promise<number> {
    return (await this.getItemList()).find((item) => item.name === name).price;
  }
  async getOneItem(id: string): Promise<ShopItem> {
    return await ShopItem.findOne(id);
  }
}
