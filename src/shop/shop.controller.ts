import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  ImATeapotException,
  Inject,
  Param,
  ParseIntPipe,
  Scope,
} from '@nestjs/common';
import { CheckAgePipe } from 'src/pipes/check-age.pipe';
import { ShopItem } from './shop-item.entity';
import { ShopService } from './shop.service';

@Controller({
  path: 'shop',
  scope: Scope.REQUEST,
})
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}
  @Get('/products')
  itemList(): // @Param('page') page: string,
  Promise<ShopItem[]> {
    return this.shopService.getItemList();
  }

  @Get('/test')
  test() {
    throw new ImATeapotException('Oh no!');
  }
}
