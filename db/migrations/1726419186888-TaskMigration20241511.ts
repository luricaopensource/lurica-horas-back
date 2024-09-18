import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskMigration202415111726419186888 implements MigrationInterface {
    name = 'TaskMigration202415111726419186888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`date\``);
    }

}
