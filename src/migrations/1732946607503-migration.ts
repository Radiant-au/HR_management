import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732946607503 implements MigrationInterface {
    name = 'Migration1732946607503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`overtime\` DROP COLUMN \`startTime\``);
        await queryRunner.query(`ALTER TABLE \`overtime\` ADD \`startTime\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`overtime\` DROP COLUMN \`endTime\``);
        await queryRunner.query(`ALTER TABLE \`overtime\` ADD \`endTime\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`overtime\` DROP COLUMN \`endTime\``);
        await queryRunner.query(`ALTER TABLE \`overtime\` ADD \`endTime\` time NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`overtime\` DROP COLUMN \`startTime\``);
        await queryRunner.query(`ALTER TABLE \`overtime\` ADD \`startTime\` time NOT NULL`);
    }

}
