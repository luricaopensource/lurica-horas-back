import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202408061722975981743 implements MigrationInterface {
    name = 'Migration202408061722975981743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`type\` \`type\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`type\` \`type\` varchar(255) NOT NULL`);
    }

}
