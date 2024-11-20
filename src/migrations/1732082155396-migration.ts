import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732082155396 implements MigrationInterface {
    name = 'Migration1732082155396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`einformation\` CHANGE \`degreeOrCertificate\` \`degreeOrCertificate\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`einformation\` CHANGE \`experience\` \`experience\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`einformation\` CHANGE \`experience\` \`experience\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`einformation\` CHANGE \`degreeOrCertificate\` \`degreeOrCertificate\` varchar(255) NOT NULL`);
    }

}
