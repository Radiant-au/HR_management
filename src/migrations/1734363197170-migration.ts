import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734363197170 implements MigrationInterface {
    name = 'Migration1734363197170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave\` DROP FOREIGN KEY \`FK_9972845370f0cdf9b048018cead\``);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP COLUMN \`createdById\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave\` ADD \`createdById\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD CONSTRAINT \`FK_9972845370f0cdf9b048018cead\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
