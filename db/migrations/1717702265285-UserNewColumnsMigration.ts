import { MigrationInterface, QueryRunner } from "typeorm";

export class UserNewColumnsMigration1717702265285 implements MigrationInterface {
    name = 'UserNewColumnsMigration1717702265285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`currency\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hourlyAmount\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`monthlyAmount\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`monthlyAmount\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hourlyAmount\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`currency\``);
    }

}
