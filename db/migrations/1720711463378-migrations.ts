import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720711463378 implements MigrationInterface {
    name = 'Migrations1720711463378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`milestoneId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_0b1e6e6f89e39e84933d144890b\` FOREIGN KEY (\`milestoneId\`) REFERENCES \`milestone\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_816f608a9acf4a4314c9e1e9c66\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_816f608a9acf4a4314c9e1e9c66\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_0b1e6e6f89e39e84933d144890b\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`milestoneId\``);
    }

}
