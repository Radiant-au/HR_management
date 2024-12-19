import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734256269720 implements MigrationInterface {
    name = 'Migration1734256269720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave_balance\` DROP COLUMN \`credit\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave_balance\` ADD \`credit\` int NOT NULL DEFAULT '0'`);
    }

}
