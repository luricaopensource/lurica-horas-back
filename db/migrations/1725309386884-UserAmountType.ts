import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAmountType1725309386884 implements MigrationInterface {
    name = 'UserAmountType1725309386884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`amountType\` int NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`amountType\``);
    }

}
