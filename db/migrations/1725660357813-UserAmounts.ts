import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAmounts1725660357813 implements MigrationInterface {
    name = 'UserAmounts1725660357813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hourlyAmount\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`monthlyAmount\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`amount\` decimal(15,2) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`monthlyAmount\` decimal(15,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hourlyAmount\` decimal(15,2) NULL`);
    }

}
