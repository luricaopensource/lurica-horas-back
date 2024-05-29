import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717012130199 implements MigrationInterface {
    name = 'Migrations1717012130199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, \`projectsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_6c4ff82ed032d3c74b01bcae08e\` FOREIGN KEY (\`projectsId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_6c4ff82ed032d3c74b01bcae08e\``);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}
