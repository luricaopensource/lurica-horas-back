import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717039525549 implements MigrationInterface {
    name = 'Migrations1717039525549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`milestone\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`total_amount\` int NOT NULL, \`paid_amount\` int NOT NULL, \`surplus_amount\` int NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`companyId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD CONSTRAINT \`FK_edc28a2e0442554afe5eef2bdcb\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_17c18aa92afa5fa328e9e181fe8\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_17c18aa92afa5fa328e9e181fe8\``);
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP FOREIGN KEY \`FK_edc28a2e0442554afe5eef2bdcb\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`companyId\``);
        await queryRunner.query(`DROP TABLE \`milestone\``);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}
