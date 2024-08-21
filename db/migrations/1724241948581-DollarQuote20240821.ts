import { MigrationInterface, QueryRunner } from "typeorm";

export class DollarQuote202408211724241948581 implements MigrationInterface {
    name = 'DollarQuote202408211724241948581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dollar_quote\` (\`id\` int NOT NULL AUTO_INCREMENT, \`official\` int NOT NULL, \`blue\` int NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`dollar_quote\``);
    }

}
