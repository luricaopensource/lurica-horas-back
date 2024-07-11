import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720653350289 implements MigrationInterface {
    name = 'Migrations1720653350289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`amount\` decimal(15,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`amount\``);
    }

}
