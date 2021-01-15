import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { basketItemDto } from './dto/basketItem.dto';
import { ShopService } from '../shop/shop.service';
import {
  AddProductToBasketResponse,
  GetBasketStatsResponse,
  GetTotalPriceResponse,
  RemoveProductFromBasket,
} from '../interface/basket';
import { ItemInBasket } from './item-in-basket.entity';
import { UserService } from 'src/user/user.service';
import { getConnection } from 'typeorm';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
    @Inject(UserService) private userService: UserService,
  ) {}
  async addItem(newItem: basketItemDto): Promise<AddProductToBasketResponse> {
    const { productId, userId, count } = newItem;

    const shopItem = await this.shopService.getOneItem(productId);
    const userExist = await this.userService.checkUser(userId);
    if (
      typeof productId !== 'string' ||
      typeof userId !== 'string' ||
      typeof count !== 'number' ||
      productId === '' ||
      userId === '' ||
      count < 1 ||
      !shopItem ||
      !userExist
    ) {
      return { isSuccess: false };
    } else {
      const item = new ItemInBasket();
      item.count = count;

      await item.save();
      item.shopItem = shopItem;
      item.user = userExist;
      await item.save();
      return { isSuccess: true, id: item.id };
    }
  }
  async delItem(
    itemInBasketId: string,
    userId: string,
  ): Promise<RemoveProductFromBasket> {
    const user = await this.userService.checkUser(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    const item = await ItemInBasket.findOne({
      where: {
        id: itemInBasketId,
        user,
      },
    });
    if (item) {
      await item.remove();
      return { isSuccess: true };
    }
    return { isSuccess: false };
  }
  itemFinding(name): Promise<boolean> {
    return this.shopService.didItemExist(name.toString());
  }
  async printItems(userId: string): Promise<ItemInBasket[]> {
    const user = await this.userService.checkUser(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    return await ItemInBasket.find({
      where: {
        user,
      },
      relations: ['shopItem'],
    });
  }

  async clearBasket(userId: string) {
    const user = await this.userService.checkUser(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    await ItemInBasket.delete({
      user,
    });
  }
  async getTotalPrice(userId): Promise<GetTotalPriceResponse> {
    const items = await this.printItems(userId);
    return (
      await Promise.all(
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
  async getAllForAdmin(): Promise<ItemInBasket[]> {
    return ItemInBasket.find({
      relations: ['shopItem', 'user'],
    });
  }
  async getStats(): Promise<GetBasketStatsResponse> {
    const {
      itemInBasketAvgPrice,
    } = await getConnection()
      .createQueryBuilder()
      .select('AVG(shopItem.price)', 'itemInBasketAvgPrice')
      .from(ItemInBasket, 'itemInBasket')
      .leftJoinAndSelect('itemInBasket.shopItem', 'shopItem')
      .getRawOne();

    return {
      itemInBasketAvgPrice,
      basketAvgTotalPrice: 0,
    };
  }
}
