import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1713876786237 implements MigrationInterface {
    name = 'NewMigrations1713876786237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dateFrom\` datetime NOT NULL, \`dateTo\` datetime NOT NULL, \`hours\` int NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`task\``);
    }

}
