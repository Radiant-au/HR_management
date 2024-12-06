import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733223297688 implements MigrationInterface {
    name = 'Migration1733223297688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
