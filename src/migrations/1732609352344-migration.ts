import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732609352344 implements MigrationInterface {
    name = 'Migration1732609352344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee_shift\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`employee_shift\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee_shift\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`employee_shift\` DROP COLUMN \`created_at\``);
    }

}
