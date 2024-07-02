import { MigrationInterface, QueryRunner } from "typeorm"

export class AmountsTypes1718822227329 implements MigrationInterface {
    name = 'AmountsTypes1718822227329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`paid_amount\``)
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`surplus_amount\``)
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`total_amount\``)
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`totalAmount\` decimal(15,2) NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`paidAmount\` decimal(15,2) NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`surplusAmount\` decimal(15,2) NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` int NOT NULL DEFAULT '1'`)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`currency\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`currency\` int NULL`)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hourlyAmount\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hourlyAmount\` decimal(15,2) NULL`)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`monthlyAmount\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`monthlyAmount\` decimal(15,2) NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`monthlyAmount\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`monthlyAmount\` int NULL`)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hourlyAmount\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hourlyAmount\` int NULL`)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`currency\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`currency\` varchar(255) NULL`)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'employee'`)
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`surplusAmount\``)
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`paidAmount\``)
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`totalAmount\``)
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`total_amount\` int NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`surplus_amount\` int NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`paid_amount\` int NOT NULL`)
    }

}
