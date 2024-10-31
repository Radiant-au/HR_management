import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730349462593 implements MigrationInterface {
    name = 'Migration1730349462593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`checkIn\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`checkIn\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`checkOut\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`checkOut\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`checkOut\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`checkOut\` time NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`checkIn\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`checkIn\` time NULL`);
    }

}
