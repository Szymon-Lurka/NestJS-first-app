import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersionOfShopItemEntity1610623676489 implements MigrationInterface {
    name = 'NewVersionOfShopItemEntity1610623676489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `description` `description` text NULL DEFAULT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `description` `description` text NULL");
    }

}
