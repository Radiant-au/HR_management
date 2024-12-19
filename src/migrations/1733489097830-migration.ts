import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733489097830 implements MigrationInterface {
    name = 'Migration1733489097830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave_balance\` ADD \`year\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave_balance\` DROP COLUMN \`year\``);
    }

}
