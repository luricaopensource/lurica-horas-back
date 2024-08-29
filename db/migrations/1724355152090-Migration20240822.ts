import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202408221724355152090 implements MigrationInterface {
    name = 'Migration202408221724355152090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`dateFrom\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`dateTo\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`dateTo\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`dateFrom\` datetime NOT NULL`);
    }

}
