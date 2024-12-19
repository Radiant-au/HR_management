import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733506779525 implements MigrationInterface {
    name = 'Migration1733506779525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave_balance\` DROP COLUMN \`unpaid\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave_balance\` ADD \`unpaid\` int NOT NULL DEFAULT '0'`);
    }

}
