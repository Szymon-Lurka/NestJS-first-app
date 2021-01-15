import {
  Controller,
  Body,
  Inject,
  Post,
  Delete,
  Param,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { basketItemDto } from './dto/basketItem.dto';
import {
  AddProductToBasketResponse,
  GetBasketStatsResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
  RemoveProductFromBasket,
} from '../interface/basket';
import { PasswordProtectGuard } from 'src/guards/password-proect.guard';
import { UsePassword } from 'src/decorators/use-password.decorator';
import { MyTimeoutInterceptor } from 'src/interceptors/my-timeout.interceptor';
import { MyCacheInterceptor } from 'src/interceptors/my-cache.interceptor';
import { UseCacheTime } from 'src/decorators/use-cache-time.decorator';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}
  @Post('/')
  async addItemToBasket(
    @Body() basketItem: basketItemDto,
  ): Promise<AddProductToBasketResponse> {
    return await this.basketService.addItem(basketItem);
  }
  @Delete('/delete/all/:userId')
  async delAllItem(@Param('userId') userId: string) {
    return await this.basketService.clearBasket(userId);
  }
  @Delete('/delete/:itemInBasketId/:userId')
  async delItem(@Param('itemInBasketId') itemInBasketId: string,
  @Param('userId') userId: string,
  ): Promise<RemoveProductFromBasket> {
    return await this.basketService.delItem(itemInBasketId, userId);
  }
  @Post('/finder')
  finderItem(@Body('name') name: string): Promise<boolean> {
    return this.basketService.itemFinding(name);
  }
  @Get('/admin')
  @UseGuards(PasswordProtectGuard)
  @UsePassword('admin1')
  @UseInterceptors(MyTimeoutInterceptor, MyCacheInterceptor)
  @UseCacheTime(1500)
  async getAllItems(): Promise<ListProductsInBasketResponse> {
    return await this.basketService.getAllForAdmin();
  }
  @Get('/stats')
  getStats(): Promise<GetBasketStatsResponse> {
    return this.basketService.getStats();
  }
  @Get('/:userId')
  async getItemList(
    @Param('userId') userId: string,
  ): Promise<ListProductsInBasketResponse> {
    return await this.basketService.printItems(userId);
  }
  @Get('/total-price/:userId')
  getTotalPrice(
    @Param('userId') userId: string,
  ): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice(userId);
  }
}
