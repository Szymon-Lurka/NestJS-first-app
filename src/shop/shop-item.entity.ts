import { ItemInBasket } from 'src/basket/item-in-basket.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ListData } from '../interface/shop';

@Entity()
export class ShopItem extends BaseEntity implements ListData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    length: 1000,
  })
  description: string;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
  })
  price: number;

  @OneToMany((type) => ItemInBasket, (entity) => entity.shopItem)
  itemsInBasket: ItemInBasket[];
}
