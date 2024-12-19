import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733636270787 implements MigrationInterface {
    name = 'Migration1733636270787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave\` DROP COLUMN \`startDate\``);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD \`startDate\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP COLUMN \`endDate\``);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD \`endDate\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave\` DROP COLUMN \`endDate\``);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD \`endDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP COLUMN \`startDate\``);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD \`startDate\` datetime NOT NULL`);
    }

}
