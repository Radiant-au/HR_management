import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733505249048 implements MigrationInterface {
    name = 'Migration1733505249048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave_balance\` DROP COLUMN \`carryForwarded\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave_balance\` ADD \`carryForwarded\` int NOT NULL DEFAULT '0'`);
    }

}
