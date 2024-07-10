import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720648531100 implements MigrationInterface {
    name = 'Migrations1720648531100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`totalAmount\``);
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`paidAmount\``);
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`surplusAmount\``);
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`amount\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`currency\` \`currency\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`currency\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`currency\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`currency\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`currency\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`currency\` \`currency\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`surplusAmount\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`paidAmount\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`totalAmount\` decimal(15,2) NOT NULL`);
    }

}
