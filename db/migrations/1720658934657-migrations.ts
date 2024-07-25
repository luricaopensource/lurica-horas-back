import { MigrationInterface, QueryRunner } from "typeorm"

export class Migrations1720658934657 implements MigrationInterface {
    name = 'Migrations1720658934657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE company RENAME client`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE client RENAME company`)
    }
}
