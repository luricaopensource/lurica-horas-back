import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717024487878 implements MigrationInterface {
    name = 'Migrations1717024487878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`milestone\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`total_amount\` int NOT NULL, \`paid_amount\` int NOT NULL, \`surplus_amount\` int NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`milestonesId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_72350a6e15dd5a9465297ec4483\` FOREIGN KEY (\`milestonesId\`) REFERENCES \`milestone\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_72350a6e15dd5a9465297ec4483\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`milestonesId\``);
        await queryRunner.query(`DROP TABLE \`milestone\``);
    }

}
