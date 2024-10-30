import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730279244777 implements MigrationInterface {
    name = 'Migration1730279244777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`einformation\` DROP FOREIGN KEY \`FK_20e9bbebba5c36ad89eddef60db\``);
        await queryRunner.query(`DROP INDEX \`REL_20e9bbebba5c36ad89eddef60d\` ON \`einformation\``);
        await queryRunner.query(`ALTER TABLE \`einformation\` DROP COLUMN \`employee_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`einformation\` ADD \`employee_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_20e9bbebba5c36ad89eddef60d\` ON \`einformation\` (\`employee_id\`)`);
        await queryRunner.query(`ALTER TABLE \`einformation\` ADD CONSTRAINT \`FK_20e9bbebba5c36ad89eddef60db\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
