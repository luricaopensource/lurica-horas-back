import { MigrationInterface, QueryRunner } from "typeorm";

export class UserToProject1725656523286 implements MigrationInterface {
    name = 'UserToProject1725656523286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` CHANGE \`userHourlyAmount\` \`userHourlyAmount\` decimal(15,2) NOT NULL DEFAULT '1.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` CHANGE \`userHourlyAmount\` \`userHourlyAmount\` decimal(15,2) NOT NULL`);
    }

}
