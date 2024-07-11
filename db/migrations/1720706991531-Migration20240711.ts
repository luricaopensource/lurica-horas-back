import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration202407111720706991531 implements MigrationInterface {
    name = 'Migration202407111720706991531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_17c18aa92afa5fa328e9e181fe8\``)
        await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`companyId\` \`clientId\` int NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`clientId\` \`companyId\` int NULL`)
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_17c18aa92afa5fa328e9e181fe8\` FOREIGN KEY (\`companyId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

}
