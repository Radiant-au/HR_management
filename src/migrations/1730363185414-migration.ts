import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730363185414 implements MigrationInterface {
    name = 'Migration1730363185414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` ADD \`profileImg\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` DROP COLUMN \`profileImg\``);
    }

}
