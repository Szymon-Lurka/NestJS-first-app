import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [BasketModule, ShopModule, TypeOrmModule.forRoot(), UserModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
