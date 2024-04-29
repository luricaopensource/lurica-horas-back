import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTask1714423492507 implements MigrationInterface {
    name = 'CreateTask1714423492507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`type\` varchar(255) NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`paid\` tinyint NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`status\` varchar(255) NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`)
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP`)
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`deletedAt\` timestamp NULL`)
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`userId\` int NULL`)
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_f316d3fe53497d4d8a2957db8b9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_f316d3fe53497d4d8a2957db8b9\``)
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`userId\``)
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`deletedAt\``)
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`updatedAt\``)
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`createdAt\``)
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`status\``)
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`paid\``)
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`type\``)
    }

}
