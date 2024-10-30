import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730283234175 implements MigrationInterface {
    name = 'Migration1730283234175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_cc6d669c5b370f398ee4c583e0a\``);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_cc6d669c5b370f398ee4c583e0a\` FOREIGN KEY (\`e_background_id\`) REFERENCES \`einformation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_cc6d669c5b370f398ee4c583e0a\``);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_cc6d669c5b370f398ee4c583e0a\` FOREIGN KEY (\`e_background_id\`) REFERENCES \`einformation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
