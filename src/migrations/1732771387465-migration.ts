import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732771387465 implements MigrationInterface {
    name = 'Migration1732771387465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave\` CHANGE \`approvedAt\` \`approvedById\` datetime NULL`);
        await queryRunner.query(`CREATE TABLE \`overtime\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`startTime\` time NOT NULL, \`endTime\` time NOT NULL, \`status\` varchar(50) NOT NULL DEFAULT 'open', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_overtime\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`overtimeId\` int NULL, \`employeeId\` varchar(36) NULL, \`assignedById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP COLUMN \`approvedById\``);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD \`approvedById\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`overtime\` ADD CONSTRAINT \`FK_cbcb8e456abebea1ba32b6c4765\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD CONSTRAINT \`FK_fb9407a17d10a081caef3d826ca\` FOREIGN KEY (\`approvedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` ADD CONSTRAINT \`FK_7dab1224bc3a86699517a82803a\` FOREIGN KEY (\`overtimeId\`) REFERENCES \`overtime\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` ADD CONSTRAINT \`FK_43107cac411b3f71d3b2476c38f\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` ADD CONSTRAINT \`FK_1179acf8664499db2f8fba927b3\` FOREIGN KEY (\`assignedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` DROP FOREIGN KEY \`FK_1179acf8664499db2f8fba927b3\``);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` DROP FOREIGN KEY \`FK_43107cac411b3f71d3b2476c38f\``);
        await queryRunner.query(`ALTER TABLE \`employee_overtime\` DROP FOREIGN KEY \`FK_7dab1224bc3a86699517a82803a\``);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP FOREIGN KEY \`FK_fb9407a17d10a081caef3d826ca\``);
        await queryRunner.query(`ALTER TABLE \`overtime\` DROP FOREIGN KEY \`FK_cbcb8e456abebea1ba32b6c4765\``);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP COLUMN \`approvedById\``);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD \`approvedById\` datetime NULL`);
        await queryRunner.query(`DROP TABLE \`employee_overtime\``);
        await queryRunner.query(`DROP TABLE \`overtime\``);
        await queryRunner.query(`ALTER TABLE \`leave\` CHANGE \`approvedById\` \`approvedAt\` datetime NULL`);
    }

}
