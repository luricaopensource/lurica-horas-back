import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMigration1716988135806 implements MigrationInterface {
    name = 'FixMigration1716988135806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'employee', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dateFrom\` datetime NOT NULL, \`dateTo\` datetime NOT NULL, \`hours\` int NOT NULL, \`description\` text NOT NULL, \`type\` varchar(255) NOT NULL, \`paid\` tinyint NOT NULL, \`status\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, \`userId\` int NULL, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`currency\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_to_projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userHourlyAmount\` decimal(15,2) NOT NULL, \`userId\` int NULL, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_f316d3fe53497d4d8a2957db8b9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_3797a20ef5553ae87af126bc2fe\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` ADD CONSTRAINT \`FK_74ee66dfd2ae778715224481af3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` ADD CONSTRAINT \`FK_48f79ba6ea516d1334c40520615\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` DROP FOREIGN KEY \`FK_48f79ba6ea516d1334c40520615\``);
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` DROP FOREIGN KEY \`FK_74ee66dfd2ae778715224481af3\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_3797a20ef5553ae87af126bc2fe\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_f316d3fe53497d4d8a2957db8b9\``);
        await queryRunner.query(`DROP TABLE \`users_to_projects\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`task\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
