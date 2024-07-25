import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration202407251721921497988 implements MigrationInterface {
    name = 'Migration202407251721921497988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users_to_companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, \`userId\` int NULL, \`companyId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`)
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` ADD \`updatedAt\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP`)
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` ADD \`deletedAt\` timestamp NULL`)
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`amountPercentage\``)
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`amountPercentage\` float NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`users_to_companies\` ADD CONSTRAINT \`FK_b5b99a90e92d2f7e578a4e46c3d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`users_to_companies\` ADD CONSTRAINT \`FK_cd7788ff3412eb02b8e42d1beff\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`client\` ADD CONSTRAINT \`FK_3d7a0b6e0f1d0c0ab1bc189645f\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` DROP FOREIGN KEY \`FK_3d7a0b6e0f1d0c0ab1bc189645f\``)
        await queryRunner.query(`ALTER TABLE \`users_to_companies\` DROP FOREIGN KEY \`FK_cd7788ff3412eb02b8e42d1beff\``)
        await queryRunner.query(`ALTER TABLE \`users_to_companies\` DROP FOREIGN KEY \`FK_b5b99a90e92d2f7e578a4e46c3d\``)
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP COLUMN \`amountPercentage\``)
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD \`amountPercentage\` decimal(15,2) NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` DROP COLUMN \`deletedAt\``)
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` DROP COLUMN \`updatedAt\``)
        await queryRunner.query(`ALTER TABLE \`users_to_projects\` DROP COLUMN \`createdAt\``)
        await queryRunner.query(`DROP TABLE \`company\``)
        await queryRunner.query(`DROP TABLE \`users_to_companies\``)
    }

}
