import { MigrationInterface, QueryRunner } from "typeorm";

export class DollarQuoteAmount202408211724242684162 implements MigrationInterface {
    name = 'DollarQuoteAmount202408211724242684162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dollar_quote\` DROP COLUMN \`official\``);
        await queryRunner.query(`ALTER TABLE \`dollar_quote\` ADD \`official\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dollar_quote\` DROP COLUMN \`blue\``);
        await queryRunner.query(`ALTER TABLE \`dollar_quote\` ADD \`blue\` decimal(15,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dollar_quote\` DROP COLUMN \`blue\``);
        await queryRunner.query(`ALTER TABLE \`dollar_quote\` ADD \`blue\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dollar_quote\` DROP COLUMN \`official\``);
        await queryRunner.query(`ALTER TABLE \`dollar_quote\` ADD \`official\` int NOT NULL`);
    }

}
